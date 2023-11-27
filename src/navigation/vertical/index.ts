// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';
import { findPermission } from 'src/components/findPermission';

const navigation = (): VerticalNavItemsType => {
  const activosChildren = [
    {
      title: 'Registrar Activos',
      path: '/listaact',
      icon: 'mdi:currency-usd-circle',
      permissions: 'ACTIVO_OBTENER_ACTIVOS_ACT'
    },
    {
      title: 'Grupos Contables',
      path: '/GruposContables/grupo',
      icon: 'mdi:account-group',
      permissions: 'ACTIVO_OBTENER_GRUPOS_CONTABLES_ACT'
    },
    {
      title: 'Calcular Depreciacion de un activo',
      path: '/DepreciacionesDeActivos',
      icon: 'mdi:account-clock',
      permissions: 'ACTIVO_OBTENER_UFVS_ACT'
    },
    {
      title: 'Entrega De Activos',
      path: '/EntregaDeActivos/entrega2',
      icon: 'mdi:account-box-multiple',
      permissions: 'ACTIVO_OBTENER_ENTREGA_ACT'
    },
    {
      title: 'Devolución De Activos',
      path: '/DevolucionDeActivos/devolucion',
      icon: 'mdi:account-box-multiple',
      permissions: 'ACTIVO_OBTENER_DEVOLUCION_ACT'
    },
    {
      title: 'Bitacora',
      path: '/Bitacora',
      icon: 'mdi:clipboard-list',
      permissions: 'ACTIVO_VISUALIZAR_BITACORAS_ACT'
    },
    {
      title: 'Linea de Tiempo',
      path: '/timeLine',
      icon: 'mdi:clipboard-list',
      permissions: 'ACTIVO_VISUALIZAR_BITACORAS_ACT'
    }
  ];

  const activosSection = {
    title: 'Activos',
    icon: 'mdi:briefcase-account',
    children: activosChildren.filter(item => findPermission(item.permissions))
  };

  return [
    {
      title: 'Inicio',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    activosSection,
    {
      title: 'Proveedores',
      icon: 'mdi:account-outline',
      children: findPermission('ACTIVO_OBTENER_PROVEEDORES_ACT') ? [
        {
          title: 'Registrar Proveedor',
          path: '/proveedores/getprovider2',
          icon: 'mdi:account-check',
          permissions: 'ACTIVO_registrar_proveedor_ACT'
        }
      ] : []
    }
  ];
};

export default navigation;


// // ** Type import
// import { VerticalNavItemsType } from 'src/@core/layouts/types'
// import { findPermission } from 'src/components/findPermission'

// const navigation = (): VerticalNavItemsType => {
//   return [
//     {
//       title: 'Inicio',
//       path: '/home',
//       icon: 'mdi:home-outline'
//     },

//     {
//       title: 'Activos',
//       icon: 'mdi:briefcase-account',
//       children: [
//         {
//           title: 'Registrar Activos',
//           path: '/listaact',
//           icon: 'mdi:currency-usd-circle'

//         },
//         {
//           title: 'Grupos Contables',
//           path: '/GruposContables/grupo',
//           icon: 'mdi:account-group'
//         },
//         {
//           title: 'Calcular Depreciacion de un activo',
//           path: '/DepreciacionesDeActivos',
//           icon: 'mdi:account-clock'

//         },
//         {
//           title: 'Entrega De Activos',
//           path: '/EntregaDeActivos/entrega2',
//           icon: 'mdi:account-box-multiple'
//         },
//         {
//           title: 'Devolución De Activos',
//           path: '/DevolucionDeActivos/devolucion',
//           icon: 'mdi:account-box-multiple'
//         },
//         {
//           title: 'Bitacora',
//           path: '/Bitacora',
//           icon: 'mdi:clipboard-list'
//         },
//         {
//           title: 'Linea de Tiempo',
//           path: '/timeLine',
//           icon: 'mdi:clipboard-list'
//         }
//       ]
//     },
//     {
//       title: 'Proveedores',
//       icon: 'mdi:account-outline',
//       children: findPermission('ACTIVO_OBTENER_PROVEEDORES_ACT') ? [
//         {
//           title: 'Registrar Proveedor',
//           path: '/proveedores/getprovider2',
//           icon: 'mdi:account-check'
//         }
//       ] : []
//     }

//   ]
// }

// export default navigation
