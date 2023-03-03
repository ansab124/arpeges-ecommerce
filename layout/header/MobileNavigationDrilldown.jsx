import React from "react";
// import { useHistory, useLocation } from 'react-router-dom';
// import Router, { withRouter } from 'next/router';

import { useRouter, withRouter } from "next/router";

// import { ReactDrilldownMenu } from 'react-drilldown-menu';
import { FaRegFolder } from "react-icons/fa";

const MobileNavigationDrilldown = ({ menuList }) => {
  // Source:👇
  // https://github.com/noximy/react-drilldown-menu

  const router = useRouter();
  const location = router.pathname;

  // const location = useLocation();
  // const history = useHistory();

  const handleLeafNodeClick = (newPath) => {
    // history.push(newPath);
    router.push(newPath);
  };

  return (
    <div className="menu menu-list ">
      {/* <ReactDrilldownMenu
        theme="dark" // "light" or "dark"
        customTheme={{
          selectionBackgroundColor: '#444444',
        }}
        activeLink={location}
        defaultLeafIcon={<FaRegFolder />}
        defaultBranchIcon={<FaRegFolder />}
        links={{
          home: {
            label: 'Home',
            icon: <FaRegFolder />,
          },
          desktop: {
            label: 'Desktop',
            icon:<FaRegFolder />,
            links: {
              'folder-1': {
                label: 'Folder 1',
                links: {
                  'file-1.1': {
                    label: 'File 1.1',
                  },
                  'file-1.2': {
                    label: 'File 1.2',
                  },
                  'file-1.3': {
                    label: 'File 1.3',
                  },
                },
              },
              'folder-2': {
                label: 'Folder 2',
                links: {
                  'file-2.1': {
                    label: 'File 2.1',
                  },
                  'file-2.2': {
                    label: 'File 2.2',
                  },
                },
              },
            },
          },

          settings: {
            label: 'Settings',
            icon: <FaRegFolder />,
          },
          about: {
            label: 'About',
            icon:<FaRegFolder />,
          },
        }}
        onLeafNodeClick={handleLeafNodeClick}
      /> */}
    </div>
  );
};

export default MobileNavigationDrilldown;
