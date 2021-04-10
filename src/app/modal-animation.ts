import { Animation, createAnimation } from '@ionic/angular';

//
// ENTER
//
export const modalEnterAnimation = (
  baseEl: HTMLElement,
  presentingEl?: HTMLElement,
): Animation => {
 
  const backdropAnimation = createAnimation()
    .addElement(baseEl.querySelector('ion-backdrop')!)
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({
      'pointer-events': 'none'
    })
    .afterClearStyles(['pointer-events']);
 
  const wrapperAnimation = createAnimation()
    .addElement(baseEl.querySelectorAll('.modal-wrapper, .modal-shadow')!)
    .beforeStyles({ 'opacity': 0, 'transform': 'translateY(0)' })
    .fromTo('opacity', 0, 1);
 
  const baseAnimation = createAnimation()
    .addElement(baseEl)
    .easing('cubic-bezier(0.32,0.72,0,1)')
    .duration(400)
    .addAnimation([wrapperAnimation, backdropAnimation]);
 
  return baseAnimation;
};
 
//
// LEAVE
//
export const modalLeaveAnimation = (
  baseEl: HTMLElement,
  presentingEl?: HTMLElement,
  duration = 500
): Animation => {
 
  const backdropAnimation = createAnimation()
    .addElement(baseEl.querySelector('ion-backdrop')!)
    .fromTo('opacity', 'var(--backdrop-opacity)', 0.0);
 
  const wrapperAnimation = createAnimation()
    .addElement(baseEl.querySelectorAll('.modal-wrapper, .modal-shadow')!)
    .beforeStyles({ 'opacity': 0 })
    .fromTo('opacity', 1, 0)
 
  const baseAnimation = createAnimation()
    .addElement(baseEl)
    .easing('ease-out')
    .duration(300)
    .addAnimation([wrapperAnimation, backdropAnimation]);
 
  return baseAnimation;
};