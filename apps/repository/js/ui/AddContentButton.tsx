import * as React from 'react';
import {AddContentMenuItem} from './AddContentMenuItem';
import {AddContentButtons} from "./AddContentButtons";
import {AppRuntimeRouter} from "../../../../web/js/ui/AppRuntimeRouter";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {MUIMenu} from "../../../../web/js/mui/menu/MUIMenu";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import {AddContentFab} from "./AddContentFab";
import {AppRuntime} from "polar-shared/src/util/AppRuntime";

namespace runtime {

    function doAddFilesFromDisk(props: IProps) {
        AddContentButtons.doAccountVerifiedAction(() => props.importFromDisk());
    }

    function doFileUpload() {
        AddContentButtons.doAccountVerifiedAction(() => AddContentButtons.triggerFileUpload());
    }

    export const Main = (props: IProps) => (
        <AppRuntimeRouter browser={<Browser/>}
                          electron={<Electron {...props}/>}/>
    );

    const Browser = () => (
            <Button id="add-content-dropdown"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon/>}
                    size="large">
                <label htmlFor="file-upload" className="m-0">
                    Add
                </label>
            </Button>
    );

    const Electron = (props: IProps) => (

        <MUIMenu caret
                 button={{
                     icon: <AddIcon/>,
                     text: 'Add',
                     color: 'primary',
                     size: 'large',
                     disableRipple: true,
                     disableFocusRipple: true,
                 }}>
            <div>

                <AddContentMenuItem id="add-content-import-from-disk"
                                    hidden={AppRuntime.isBrowser()}
                                    tooltip="Add PDF files from disk in bulk.  Select one PDF or multiple PDFs at once."
                                    icon={<InsertDriveFileIcon/>}
                                    text="Add Files from Disk"
                                    onClick={() => doAddFilesFromDisk(props)}/>

            </div>
        </MUIMenu>
    );

}

export namespace AddContent {

    function doAddFilesFromDisk(props: IProps) {
        AddContentButtons.doAccountVerifiedAction(() => props.importFromDisk());
    }

    function doFileUpload() {
        AddContentButtons.doAccountVerifiedAction(() => AddContentButtons.triggerFileUpload());
    }

    // TODO: this still won't work on desktop safari...

    export const Handheld = () => (
        <AddContentFab onClick={() => doFileUpload()}/>
    );

    export const Desktop = (props: IProps) => (
        <runtime.Main {...props}/>
    );

}

interface IProps {
    readonly importFromDisk: () => void;
    readonly captureWebPage: () => void;
}
