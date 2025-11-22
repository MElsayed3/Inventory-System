// src/pages/DashboardPage.tsx
// Main landing page after successful login. Displays content based on the user's role.

import React, { useMemo } from 'react';

// Define the roles (matching the backend definition in auth.ts)
type UserRole = 'مدير' | 'مخزن' | 'صيانة' | null;

const DashboardPage: React.FC = () => {
    // Retrieve user data from local storage
    const role: UserRole = localStorage.getItem('role') as UserRole;
    const employeeCode = localStorage.getItem('employeeCode');

    // Determine the content/links based on the user role
    const welcomeMessage = useMemo(() => {
        if (!role) {
            return "Error: Role not found. Please log in again.";
        }
        
        switch (role) {
            case 'مدير':
                return "مرحباً أيها المدير! يمكنك الوصول إلى جميع التقارير وإدارة المستخدمين.";
            case 'مخزن':
                return "أهلاً بك يا أمين المخزن. لوحة التحكم الخاصة بإدارة وإصدار واستلام المخزون.";
            case 'صيانة':
                return "مرحباً بفريق الصيانة. هنا يمكنك تتبع طلبات الصيانة وتحديث حالتها.";
            default:
                return "مرحباً بك في لوحة التحكم. دورك غير معروف.";
        }
    }, [role]);

    const dashboardLinks = useMemo(() => {
        const links = [];
        
        if (role === 'مدير' || role === 'مخزن') {
            links.push({ path: '/report', name: 'تقرير المخزون' });
        }
        if (role === 'مدير') {
            links.push({ path: '/admin/users', name: 'إدارة المستخدمين' });
        }
        if (role === 'صيانة') {
            links.push({ path: '/maintenance/requests', name: 'طلبات الصيانة' });
        }
        
        return links;
    }, [role]);

    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: 'auto', direction: 'rtl', color: '#f0f0f0', backgroundColor: '#333', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.5)' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#007bff' }}>لوحة التحكم الرئيسية</h1>
            
            <div style={{ border: '1px solid #007bff', padding: '15px', borderRadius: '4px', marginBottom: '30px', backgroundColor: '#444' }}>
                <p style={{ fontSize: '1.2em', margin: '0' }}>
                    {welcomeMessage}
                </p>
                <p style={{ fontSize: '0.9em', color: '#ccc' }}>
                    كود الموظف: {employeeCode} | الدور: {role}
                </p>
            </div>

            <h2 style={{ marginBottom: '20px', color: '#f0f0f0' }}>الوصول السريع</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {dashboardLinks.map(link => (
                    <a 
                        key={link.path} 
                        href={link.path} 
                        style={{ 
                            padding: '20px', 
                            backgroundColor: '#007bff', 
                            color: 'white', 
                            textAlign: 'center', 
                            borderRadius: '8px', 
                            textDecoration: 'none', 
                            fontSize: '1.1em',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        {link.name}
                    </a>
                ))}
            </div>
            
        </div>
    );
};

export default DashboardPage;