import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import Sidebar from '@/Components/Sidebar';
import VoiceSquare from '@/Components/Icons/VoiceSquare';
import VoiceControl from '@/Components/Chatbot/VoiceControl';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function Authenticated({ auth, header, children }) {
    const [showingSidebar, setShowingSidebar] = useState(
        window.matchMedia("(min-width: 1024px)").matches ? false : true
    );
    const [voiceControlEnabled, setVoiceControlEnabled] = useState(false);

    const toggleVoiceControl = () => {
        setVoiceControlEnabled(prevState => !prevState);
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <div className='flex max-w-[100vw]'>
                <Sidebar className={(showingSidebar ? '-left-[80vw]' : 'left-0') + ''} header='Mini Jarvis' showingSidebar={showingSidebar} onSetShowingSidebar={setShowingSidebar}/>
                    <div className={(showingSidebar ? '' : 'relative lg:left-[20rem] lg:w-[calc(100% - 20rem)] lg:max-w-[calc(100%-20rem)]') + ' w-full transition-all'}>
                        <nav className="bg-white border-b border-gray-100">
                            <div className=" px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between items-center h-16">
                                <div className="-mr-2 flex items-center">
                                        <button
                                            onClick={() => setShowingSidebar((previousState) => !previousState)}
                                            className={showingSidebar ? 'inline-flex' : 'hidden'+" items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"}
                                        >
                                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                            <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="sm:flex sm:items-center sm:ml-6">
                                        <div className="ml-3 relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                        >
                                                            <UserCircleIcon className='h-6 w-6'/>

                                                            <svg
                                                                className="ml-2 -mr-0.5 h-4 w-4"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                                        Log Out
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>                
                        <main className='w-full'>{children}</main>
                    </div>
                </div>
            </div>

            {/* Voice Control Fixed Element */}
            <div className='fixed bottom-0 right-0 '>
            {voiceControlEnabled?<VoiceControl onClick={toggleVoiceControl}/>:''}
                <VoiceSquare onClick={toggleVoiceControl} className="float-right h-12 w-12 hover:cursor-pointer"/>   
            </div>
        </>
    );
}
