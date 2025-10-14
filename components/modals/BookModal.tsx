import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from '@/components/ui/modal'
import {Button, ButtonText} from '@/components/ui/button'
import {Heading} from '@/components/ui/heading'
import {Text} from '@/components/ui/text'
import {CloseIcon, Icon} from '@/components/ui/icon'

const BookModal = ({showModal = false, setShowModal,}: {
    showModal: boolean,
    setShowModal: (show: boolean) => void
}) => {

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
                setShowModal(false)
            }}
            size={'md'}
            useRNModal
        >
            <ModalBackdrop/>
            <ModalContent>
                <ModalHeader>
                    <Heading size="lg">Modal Title</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon}/>
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Text>This is the modal body. You can add any content here.</Text>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        action="secondary"
                        className="mr-3"
                        onPress={() => {
                            setShowModal(false)
                        }}
                    >
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                        onPress={() => {
                            setShowModal(false)
                        }}
                    >
                        <ButtonText>Save</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default BookModal