/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { faConnectdevelop, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { faClose, faDashboard, faHeadSideHeart, faPeople, faPotFood} from '@fortawesome/pro-solid-svg-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { faBook, faComment, faDog } from '@fortawesome/free-solid-svg-icons';


const solutions = [
    {
        name: 'Lets talk',
        description: "You just want to get a friend to meet from time to time for a chat and a coffe? There are a lot of people that are willing to have a chat with you.",
        href: '/discover/list/none/lets-talk',
        icon: faComment,
    },
    {
        name: 'Lets eat together',
        description: 'If you don\'t like eating alone or you need help with preparing the food, please look at the people that can help you with that.',
        href: '/discover/list/none/lets-eat-together',
        icon: faPotFood,
    },
    { 
        name: 'Help with studies and homework', 
        description: "If your kids needs somebody to help them with the homework you can look for people that can help them with that", 
        href: '/discover/list/none/help-with-studies-and-homework', 
        icon: faBook 
    },
    {
        name: 'Animals care',
        description: 'Find people that can help you take care of your animals when you are planning to go on the vaccation or will walk your dog when you are not able to.',
        href: '/discover/list/none/animals-care',
        icon: faDog,
    },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

function Navbar({page}: {page: string}) {

    const { login, logout } = useAuth();
    
    const [loading, setLoading] = useState(false);

    const [ isLogged, setIsLogged ] = useState(false)

    useEffect( () => {
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            setLoading(false)
            if (user) {
                setIsLogged(true)
            } 
        });
    }, []);
    
    return (
        <header>
            <Popover className="relative bg-white">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />
                <div className="relative z-20">
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-7 md:justify-start md:space-x-10">
                        <Link href={'/'}>
                            <a className="flex font-bold text-teal-600 text-lg group">
                                <span className="sr-only">Medicine</span>
                                <FontAwesomeIcon icon={faHeadSideHeart} className="h-7 w-7 mr-1 group-hover:animate-spin-fast" aria-hidden="true" />
                                GrandpaRentals
                            </a>
                        </Link>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                            <Popover.Group as="nav" className="flex space-x-10 align-middle items-center">
                                
                                {!loading && isLogged &&
                                    <Link href={'/user'}>
                                        <a className={
                                            `
                                        text-base
                                        font-medium
                                        px-3
                                        ${page == 'user' ? "text-teal-500 hover:text-teal-900" : "text-gray-500 hover:text-gray-900"}
                                        `
                                        }>
                                            Dashboard
                                        </a>
                                    </Link>
                                } 

                                <Link href={'/discover/list/all'}>
                                    <a className={
                                        `
                                        text-base
                                        font-medium
                                        px-3
                                        ${page == 'professionals' ? "text-teal-500 hover:text-teal-900" : "text-gray-500 hover:text-gray-900"}
                                        `
                                    }>
                                        Discover people
                                    </a>
                                </Link>
                                {/* <Link href={'/offer/list'}>
                                    <a className={
                                        `
                                        text-base
                                        font-medium
                                        px-3
                                        ${page == 'offers' ? "text-teal-600 hover:text-teal-900" : "text-gray-500 hover:text-gray-900" }
                                        `
                                    }>
                                        Empresas
                                    </a>
                                </Link> */}
                                <Popover>
                                    {({ open }) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    open ? 'text-gray-900' : 'text-gray-500',
                                                    'px-3 group bg-white rounded-md inline-flex items-center text-base font-medium border-2 border-transparent hover:text-gray-900 focus:text-white focus:bg-teal-600 focus:outline-none focus:border-teal-600 focus:rounded-md'
                                                )}
                                            >
                                                <span>Types of help</span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-gray-600' : 'text-gray-400',
                                                        'ml-2 h-5 w-5 group-hover:text-gray-500 group-focus:text-white'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 -translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 -translate-y-1"
                                            >
                                                <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                                                    <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                                                        {solutions.map((item) => (
                                                            <Link key={item.name} href={item.href}>
                                                            <a
                                                                
                                                                className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50"
                                                            >
                                                                <div className="flex md:h-full lg:flex-col">
                                                                    <div className="flex-shrink-0">
                                                                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-teal-500 text-white sm:h-12 sm:w-12">
                                                                            <FontAwesomeIcon icon={item.icon} className="h-6 w-6" aria-hidden="true" />
                                                                        </span>
                                                                    </div>
                                                                    <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                                                        <div>
                                                                            <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                        </div>
                                                                        <p className="mt-2 text-sm font-medium text-teal-600 lg:mt-4">
                                                                            Discover people <span aria-hidden="true">&rarr;</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </Popover.Group>
                            <div className="flex items-center md:ml-12">
                                <button
                                    onClick={!loading && isLogged ? logout : login}
                                    className={`
                                        group
                                        ml-8
                                        px-4
                                        py-2
                                        border
                                        border-transparent
                                        rounded-md
                                        shadow-sm
                                        text-base
                                        font-medium
                                        text-white
                                        ${!loading && isLogged ? "bg-red-600 hover:bg-red-700" : "bg-teal-600 hover:bg-teal-700"}
                                    `}
                                >
                                 
                                {!loading && isLogged ? 
                                    <span className='
                                            inline-flex
                                            items-center
                                            justify-center'>
                                        <FontAwesomeIcon
                                            icon={faClose}
                                            className="w-4 h-4 mr-2 group-hover:animate-spin" />
                                        Logout
                                    </span>
                                    :
                                        <span className="
                                            inline-flex
                                            items-center
                                            justify-center 
                                            group-hover:text-yellow-400
                                            group-hover:animate-pulse" >
                                        <FontAwesomeIcon
                                            icon={faGoogle}
                                            className="w-4 h-4 mr-2" />
                                        Login via Google
                                    </span>
                                }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                    >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                            <div className="pt-5 pb-6 px-5 sm:pb-8">
                                <div className="flex items-center justify-between">
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6 sm:mt-8">
                                    <nav>
                                        <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                                            {solutions.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                                                >
                                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-teal-500 text-white sm:h-12 sm:w-12">
                                                        <FontAwesomeIcon icon={item.icon} className="h-6 w-6" aria-hidden="true" />
                                                    </div>
                                                    <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                                                </a>
                                            ))}
                                           
                                            <Link href={'/discover/list/all'}>
                                                <a className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50">
                                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-teal-500 text-white sm:h-12 sm:w-12">
                                                        <FontAwesomeIcon icon={faPeople} className="h-6 w-6" aria-hidden="true" />
                                                    </div>
                                                    <div className="ml-4 text-base font-medium text-gray-900">Discover people</div>
                                                </a>
                                            </Link>
                                            {!loading && isLogged &&
                                                <Link href={'/user'}>
                                                    <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-teal-500 text-white sm:h-12 sm:w-12">
                                                        <FontAwesomeIcon icon={faDashboard} className="h-6 w-6" aria-hidden="true" />
                                                    </div>
                                                    <div className="ml-4 text-base font-medium text-gray-900">Dashboard</div>
                                                </Link>
                                            } 
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div>
                                <div className="mt-6">
                                    <a
                                        href="#"
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700 "
                                    >
                                        <FontAwesomeIcon icon={faGoogle} className={"w-3 lg:w-auto mr-6"}/>
                                        Sign up
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </header>
    )
}

export default Navbar;