import React from "react"
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'

export const SidebarData = [
    {
        title: 'Podróże',
        path: '/trips',
        icon: <FaIcons.FaSuitcase/>
    },
    {
        title: 'Znajomi',
        path: '/friends',
        icon: <MdIcons.MdPeopleAlt/>
    },
    {
        title: 'Osiągnięcia',
        path: '/achievements',
        icon: <FaIcons.FaStar/>
    }
]