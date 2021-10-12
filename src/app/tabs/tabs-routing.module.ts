import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AdminGuardService } from '../services/admin-guard/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
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
        path: 'posts/ausgabe/:id',
        loadChildren: () =>
          import('./../posts/ausgabe/ausgabe.module').then(
            m => m.AusgabePageModule,
          ),
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
        path: 'settings/push',
        loadChildren: () =>
          import('./../admin/push/push.module').then(m => m.PushPageModule),
        canLoad: [AdminGuardService],
      },
      {
        path: 'settings/feedback-summary',
        loadChildren: () =>
          import('./../admin/feedback-summary/feedback-summary.module').then(
            m => m.FeedbackSummaryPageModule,
          ),
        canLoad: [AdminGuardService],
      },
      {
        path: 'settings/analytics',
        loadChildren: () =>
          import('./../admin/analytics/analytics.module').then(
            m => m.AnalyticsPageModule,
          ),
        canLoad: [AdminGuardService],
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
      {
        path: 'settings/text-size',
        loadChildren: () =>
          import('./../settings/text-size/text-size.module').then(
            m => m.TextSizePageModule,
          ),
      },
      {
        path: 'settings/push-settings',
        loadChildren: () => import('./../push-settings/push-settings.module').then( m => m.PushSettingsPageModule)
      },
      {
        path: 'impulse',
        loadChildren: () => import('./../impulse/impulse-list/impulse-list.module').then( m => m.ImpulseListPageModule)
      },
      {
        path: 'impulse/:id',
        loadChildren: () => import('./../impulse/impulse/impulse.module').then( m => m.ImpulsePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./../home/home.module').then( m => m.HomePageModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
