import * as React from 'react';

const ContainerWithNavigation = ({ children, className = '' }) => (
    <div className={`ContainerWithNavigation ${className}`}>
        {children}
    </div>
);

export class NavigationBar extends React.Component<any, any> {
    public static Container = ContainerWithNavigation;

    render() {
        return (
            <div className="NavigationBar" >

            </div>
        );
    }
}