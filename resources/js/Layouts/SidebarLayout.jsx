import Sidebar from "@/Components/Sidebar";

export default function SidebarLayout({ 
  sidebarHeader, 
  sidebarContent, 
  navbar, 
  children, 
  floatingAction,
  showingSidebar,
  setShowingSidebar
}) {

  return (
    <div className="min-h-screen flex max-w-[100vw]">
      <Sidebar
        header={sidebarHeader}
        content={sidebarContent}
        showingSidebar={showingSidebar}
        onSetShowingSidebar={setShowingSidebar}
        className={(showingSidebar ? '-left-[80vw]' : 'left-0') + ''}
      />

      <div
        className={`transition-all w-full ${
          showingSidebar
            ? ""
            : "relative lg:left-[20rem] lg:w-[calc(100%-20rem)] lg:max-w-[calc(100%-20rem)]"
        }`}
      >
        {navbar}
        <main className="w-full flex flex-col justify-center items-center">{children}</main>
      </div>

      {floatingAction}
    </div>
  );
}