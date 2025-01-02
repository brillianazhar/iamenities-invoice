import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import React from "react";

const ModalConfirm = ({
  disclosure,
  title,
  description,
  onConfirm,
  type,
  confirmBtnText,
  cancelBtnText,
  loading,
}) => {
  return (
    <Modal
      hideCloseButton
      isOpen={disclosure.isOpen}
      onOpenChange={disclosure.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-black flex flex-col items-center gap-1">
              <div
                className={`${
                  type == "success"
                    ? "bg-green-100 border-green-100"
                    : "bg-[#FEE4E2] border-[#FEF3F2]"
                } p-1 rounded-full border-5 border-solid `}
              >
                {type == "success" ? (
                  <CircleCheck color="#22c55e" />
                ) : (
                  <CircleAlert color="#D92D20" />
                )}
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-[#101828] font-semibold text-lg">
                  {title ?? ""}
                </h1>
                <p className="text-[#667085] text-sm text-center">
                  {description ?? ""}
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-1/2"
                color="default"
                variant="light"
                onPress={onClose}
                id="btn-cancel-modal"
                isDisabled={loading ?? false}
              >
                {cancelBtnText ?? "Cancel"}
              </Button>
              <Button
                className={`w-1/2 ${
                  type == "success" ? "bg-blue-500" : "bg-[#D92D20]"
                } text-white`}
                onClick={onConfirm}
                id="btn-confirm-modal"
                isLoading={loading ?? false}
                isDisabled={loading ?? false}
              >
                {confirmBtnText ?? "Confirm"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirm;
