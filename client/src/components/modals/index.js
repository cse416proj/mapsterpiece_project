import PublishMapModal from './PublishMapModal';
import UnpublishMapModal from './UnpublishMapModal';
import DeleteMapModal from './DeleteMapModal';
import DeletePostModal from './DeletePostModal';
import DeleteAccountModal from './DeleteAccountModal';
import DeleteCommentModal from './DeleteCommentModal';
import DeleteSubCommModal from './DeleteSubCommModal';
import UploadMapErrorModal from './UploadMapErrorModal';
import DataEntryModal from './DataEntryModal';
import SuccessAlert from './SuccessAlert';

const Modals = () => (
    <>
        <PublishMapModal/>
        <UnpublishMapModal/>
        <DeleteMapModal/>
        <DeletePostModal/>
        <DeleteAccountModal/>
        <DeleteCommentModal/>
        <DeleteSubCommModal/>
        <UploadMapErrorModal/>
    </>
);
  
export { Modals, DataEntryModal, SuccessAlert };

// export { Modals, PublishMapModal, UnpublishMapModal, DeleteMapModal, DeletePostModal, DeleteAccountModal, DeleteCommentModal, DeleteSubCommModal, UploadMapErrorModal, SuccessAlert }
