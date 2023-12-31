import PublishMapModal from './PublishMapModal';
import UnpublishMapModal from './UnpublishMapModal';
import DeleteMapModal from './DeleteMapModal';
import DeletePostModal from './DeletePostModal';
import DeleteAccountModal from './DeleteAccountModal';
import DeleteCommentModal from './DeleteCommentModal';
import DeleteSubCommModal from './DeleteSubCommModal';
import DataEntryModal from './DataEntryModal';
import PinDataEntryModal from './PinDataEntryModal';
import DuplicateMapModal from './DuplicateMapModal';
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
        <DuplicateMapModal/>
    </>
);
  
export { Modals, DataEntryModal, PinDataEntryModal, SuccessAlert };