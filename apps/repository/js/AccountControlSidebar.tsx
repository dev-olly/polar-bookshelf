import React from 'react';
import {RightSidebar} from "../../../web/js/ui/motion/RightSidebar";
import {AccountControl} from "../../../web/js/ui/cloud_auth/AccountControl";
import {UserInfo} from "../../../web/js/apps/repository/auth_handler/AuthHandler";
import {DeviceRouter} from "../../../web/js/ui/DeviceRouter";
import {PersistenceLayerProvider} from "../../../web/js/datastore/PersistenceLayer";
import {PersistenceLayerController} from "../../../web/js/datastore/PersistenceLayerManager";
import {AccountActions} from "../../../web/js/accounts/AccountActions";
import {useUserInfoContext} from "../../../web/js/apps/repository/auth_handler/UserInfoProvider";

interface AccountInfoProps extends AccountControlSidebarProps {
    readonly persistenceLayerController: PersistenceLayerController;
}

const AccountInfo = (props: AccountInfoProps) => {

    const userInfoContext = useUserInfoContext();

    const onLogout = () => AccountActions.logout(props.persistenceLayerController);

    if (userInfoContext?.userInfo) {
        return <AccountControl {...props}
                               userInfo={userInfoContext?.userInfo}
                               onLogout={() => onLogout()}/>;
    } else {
        return <h2>Please Login</h2>;
    }

};

interface AccountControlSidebarProps {
    readonly persistenceLayerProvider: PersistenceLayerProvider;
    readonly persistenceLayerController: PersistenceLayerController;
}

const AccountDataLoader = (props: AccountControlSidebarProps) => (
    <div className="p-2">
        <AccountInfo {...props}/>
    </div>
);

namespace devices {

    const onClose = () => window.history.back();

    export const Phone = (props: AccountControlSidebarProps) => (
        <RightSidebar onClose={() => onClose()} fullscreen={true}>
            <AccountDataLoader {...props}/>
        </RightSidebar>
    );

    export const TabletAndDesktop = (props: AccountControlSidebarProps) => (
        <RightSidebar onClose={() => onClose()}>
            <AccountDataLoader {...props}/>
        </RightSidebar>
    );

}

// FIXME: mui this needs to be a swipable drawer...
export const AccountControlSidebar = (props: AccountControlSidebarProps) => (

    <DeviceRouter phone={<devices.Phone {...props}/>}
                  tablet={<devices.TabletAndDesktop {...props}/>}
                  desktop={<devices.TabletAndDesktop {...props}/>}/>

);

