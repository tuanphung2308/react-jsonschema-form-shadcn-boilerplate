import { AppSidebar } from '@/components/app/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import './App.css';
import './styles/rtl.css';
import { useRef } from 'react';
import { AppHeader } from '@/components/app/app-header';
import { AppMainContent } from '@/components/app/app-main-content';
import { AppSettingsSidebar } from '@/components/app/app-settings-sidebar';

function App() {
  const playGroundFormRef = useRef<any>(null);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <AppMainContent ref={playGroundFormRef} />
      </SidebarInset>
      <AppSettingsSidebar formRef={playGroundFormRef} />
    </SidebarProvider>
  );
}

export default App;
