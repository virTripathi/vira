export default function LoadingPage() {
    const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'VIRA';
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-white dark:bg-black">
            <div className='text-4xl text-purple-500 animate-pulse'>{appName}</div>
        </div>
    );
}