import { Routes } from '@angular/router';
import { ROUTER_OUTLETS } from './core/routing/outlets.type';
import { ROUTER_PATHS } from './core/routing/paths.type';
import { Page404Component } from './core/pages/page-404/page-404.component';
import { CurrencyPageComponent } from './features/currency/currency-page/currency-page.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_PATHS.currency.root,
    pathMatch: 'full',
  },
  {
    path: ROUTER_PATHS.currency.root,
    component: CurrencyPageComponent,
    children: [
      {
        path: '',
        redirectTo: `/${ROUTER_PATHS.currency.root}/(${ROUTER_OUTLETS.SELECTOR}:${ROUTER_PATHS.currency.selector.one}//${ROUTER_OUTLETS.SUMMARY}:${ROUTER_PATHS.currency.summary.one}//${ROUTER_OUTLETS.CHART}:${ROUTER_PATHS.currency.chart.one})`,
        pathMatch: 'full',
      },
      {
        path: `${ROUTER_PATHS.currency.selector.one}`,
        outlet: ROUTER_OUTLETS.SELECTOR,
        loadComponent: () =>
          import(
            './features/currency/widgets/selector/selector-one/selector-one.component'
          ).then((m) => m.SelectorOneComponent),
      },
      {
        path: `${ROUTER_PATHS.currency.selector.two}`,
        outlet: ROUTER_OUTLETS.SELECTOR,
        loadComponent: () =>
          import(
            './features/currency/widgets/selector/selector-two/selector-two.component'
          ).then((m) => m.SelectorTwoComponent),
      },
      {
        path: `${ROUTER_PATHS.currency.chart.one}`,
        outlet: ROUTER_OUTLETS.CHART,
        loadComponent: () =>
          import(
            './features/currency/widgets/chart/chart-one/chart-one.component'
          ).then((m) => m.ChartOneComponent),
      },
      {
        path: `${ROUTER_PATHS.currency.chart.two}`,
        outlet: ROUTER_OUTLETS.CHART,
        loadComponent: () =>
          import(
            './features/currency/widgets/chart/chart-two/chart-two.component'
          ).then((m) => m.ChartTwoComponent),
      },
      {
        path: `${ROUTER_PATHS.currency.summary.one}`,
        outlet: ROUTER_OUTLETS.SUMMARY,
        loadComponent: () =>
          import(
            './features/currency/widgets/summary/summary-one/summary-one.component'
          ).then((m) => m.SummaryOneComponent),
      },
      {
        path: `${ROUTER_PATHS.currency.summary.two}`,
        outlet: ROUTER_OUTLETS.SUMMARY,
        loadComponent: () =>
          import(
            './features/currency/widgets/summary/summary-two/summary-two.component'
          ).then((m) => m.SummaryTwoComponent),
      },
    ],
  },

  {
    path: '**',
    component: Page404Component,
  },
];
