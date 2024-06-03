import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  /*{
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/ui/shadow',
  }, */
  {
    navlabel: true,
    subheader: 'Perfil',
  },
  {
    id: uniqueId(),
    title: 'Perfil',
    icon: IconLogin,
    href: '/perfil',
  },
  {
    navlabel: true,
    subheader: 'Controle',
  },
  /*{
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  }, */
  {
    id: uniqueId(),
    title: 'Fornecedores',
    icon: IconAperture,
    href: '/fornecedor',
  },
 
  {
    id: uniqueId(),
    title: 'Produtos',
    icon: IconAperture,
    href: '/produtos',
  },
  
 /* {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  }, */
];

export default Menuitems;
