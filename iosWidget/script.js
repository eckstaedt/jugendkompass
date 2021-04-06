const cacheMinutes = 60
let mostViewsSorted;
let widget = new ListWidget()
const today = new Date();
widget.setPadding(8, 8, 8, 8);
widget.url = "https://google.com";

await getNumbers()
await createWidget()
Script.setWidget(widget)
Script.complete()

if (config.runsInApp) {
    widget.presentSmall()
}

async function createWidget() {

    const upperStack = widget.addStack()
    upperStack.layoutHorizontally()

    let image = await getImage(args.widgetParameter === 'JugendkompassTest' ? 'kompass.jpg' : 'stephanus.png')

    let logoImage = upperStack.addImage(image)
    logoImage.imageSize = new Size(140, 60)

    widget.addSpacer(8)
    
    let staticText = widget.addText("Meistgelesener Artikel:")
    staticText.font = Font.boldSystemFont(11)
    staticText.textColor = Color.black()

    let amountText = widget.addText(mostViewsSorted[0].title.rendered);
    amountText.font = Font.boldSystemFont(11)
    amountText.textColor = Color.gray()
    widget.addSpacer(3)
  
    let lastUpdatedText = widget.addText(mostViewsSorted[0].views + " Aufrufe")
    lastUpdatedText.textColor = Color.green()
    lastUpdatedText.font = Font.mediumSystemFont(10)

}

// get images from iCloud or download them once
async function getImage(image) {
    let fm = FileManager.local()
    let dir = fm.documentsDirectory()
    let path = fm.joinPath(dir, image)
    if (fm.fileExists(path)) {
        return fm.readImage(path)
    } else {
        // download once
        let imageUrl
        switch (image) {
            case 'stephanus.png':
                imageUrl = "https://cdh-stephanus.org/wp-content/uploads/2020/05/Logo-%C3%BCbereinander-1.png"
                break
            case 'kompass.jpg':
                imageUrl = 'https://eckstaedt-webdesign.com/wp-content/uploads/2021/04/57155A7C-CDC2-4B88-8378-B6DC212D6906.jpeg'
            default:
                console.log(`Sorry, couldn't find ${image}.`);
        }
        let req = new Request(imageUrl)
        let loadedImage = await req.loadImage()
        fm.writeImage(path, loadedImage)
        return loadedImage
    }
}

async function getNumbers() {
    // Set up the file manager.
    const files = FileManager.local()

    // Set up cache
    const cachePath = files.joinPath(files.cacheDirectory(), "api-cache-stephanus") // ggfs. namen anpassen
    const cacheExists = files.fileExists(cachePath)
    const cacheDate = cacheExists ? files.modificationDate(cachePath) : 0

    // Get Data
    try {
        // If cache exists and it's been less than 60 minutes since last request, use cached data.
        if (false && cacheExists && (today.getTime() - cacheDate.getTime()) < (cacheMinutes * 60 * 1000)) {
            console.log("Get from Cache")
            mostViewsSorted = JSON.parse(files.readString(cachePath))
        } else {
            console.log("Get from API")
            let url = "https://stephanus-zeitschrift.de/wp-json/wp/v2/posts?_embed&per_page=30"
            if (args.widgetParameter === 'JugendkompassTest') {
                url = "https://eckstaedt-webdesign.com/wp-json/wp/v2/posts?_embed&per_page=30"
            }
            const req2 = new Request(url)
            const result = await req2.loadJSON()
            console.log("Write Data to Cache")
            mostViewsSorted = result.sort((a, b) => {
            a.views - b.views
            });
            try {
                files.writeString(cachePath, JSON.stringify(mostViewsSorted))
            } catch (e) {
                console.log("Creating Cache failed!")
                console.log(e)
            }
        }
    } catch (e) {
        console.error(e)
        if (cacheExists) {
            console.log("Get from Cache")
            mostViewsSorted = JSON.parse(files.readString(cachePath))
        } else {
            console.log("No fallback to cache possible. Due to missing cache.")
        }
    }
}
