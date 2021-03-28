import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'posts',
        loadChildren: () =>
          import('./../posts/post-list/post-list.module').then(
            m => m.PostListPageModule,
          ),
      },
      {
        path: 'posts/:id',
        loadChildren: () =>
          import('./../posts/post/post.module').then(m => m.PostPageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./../settings/settings/settings.module').then(
            m => m.SettingsPageModule,
          ),
      },
      {
        path: 'settings/imprint',
        loadChildren: () =>
          import('./../settings/imprint/imprint.module').then(
            m => m.ImprintPageModule,
          ),
      },
      {
        path: 'settings/dataprotection',
        loadChildren: () =>
          import('./../settings/dataprot/dataprot.module').then(
            m => m.DataprotPageModule,
          ),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('../favorites/favorites.module').then(
            m => m.FavoritesPageModule,
          ),
      },
      {
        path: 'favorites/:id',
        loadChildren: () =>
          import('./../posts/post/post.module').then(m => m.PostPageModule),
      },
      // {
      //   path: 'dates',
      //   loadChildren: () => import('./../dates/dates/dates.module').then( m => m.DatesPageModule)
      // },
      {
        path: '',
        redirectTo: '/tabs/posts',
        pathMatch: 'full',
      },
      {
        path: 'settings/text-size',
        loadChildren: () =>
          import('./../settings/text-size/text-size.module').then(
            m => m.TextSizePageModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
