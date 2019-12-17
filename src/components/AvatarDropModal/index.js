import React, { useRef } from 'react';
import { Modal } from 'antd';
import { dataURLtoBlob } from 'utils/file';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
//import { API } from 'api/metaData';

const AvatarCropperModal = props => {
  const cropper = useRef();
  const _crop = () => {
    // image in dataUrl
  };

  const handleOnOk = () => {
    const imgVal = cropper.current.getCroppedCanvas().toDataURL();
    props.setImgVal(imgVal);
    props.setAvatar(dataURLtoBlob(imgVal));
    props.setVisible(false);
  };
  return (
    <Modal visible={props.visible} onOk={handleOnOk}>
      <Cropper
        ref={cropper}
        src={props.imgVal}
        style={{ height: 400, width: '100%' }}
        // Cropper.js options
        aspectRatio={1}
        guides={false}
        crop={_crop.bind(this)}
      />
    </Modal>
  );
};

export default AvatarCropperModal;
