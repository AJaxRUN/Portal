import React, { useState, useRef, useEffect } from 'react'
import {
  Button,
  Modal,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import './DoorToPortal.css'

const DoorToPortal = (props: any) => {
  const [show, setShow] = useState(true);
  const myMediaStream = useRef<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>();
  const [portalConfig, setPortalConfig] = useState({
    audio: true,
    video: true,
  })
  const handleClose = () => setShow(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia(portalConfig)
      .then(function(stream) {
        myMediaStream.current = stream
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;
        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;
          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }
          var average = values / length;
          colorPids(average);
        }
        })
        .catch(function(err) {
          console.log(err)
      });
  }, [portalConfig])

  return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Before you jump into the portal...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={12} md={8}>
                <video ref={videoRef} />
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
            <Row>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>Join</Button>
        </Modal.Footer>
      </Modal>
  );
}

function AudioLevel() {
  return(
    <div className="pids-wrapper">
      <div className="pid"></div>
      <div className="pid"></div>
      <div className="pid"></div>
      <div className="pid"></div>
      <div className="pid"></div>
      <div className="pid"></div>
      <div className="pid"></div>
      <div className="pid"></div>
      <div className="pid"></div>
      <div className="pid"></div>
    </div>
  )
}

function colorPids(vol: number) {
  let all_pids = Array.prototype.slice.call(document.querySelectorAll('.pid'));
  const amout_of_pids = Math.round(vol/10);
  let elem_range = all_pids.slice(0, amout_of_pids)
  for (var i = 0; i < all_pids.length; i++) {
    all_pids[i].style.backgroundColor="#e6e7e8";
  }
  for (var i = 0; i < elem_range.length; i++) {
    elem_range[i].style.backgroundColor="#69ce2b";
  }
}

export default DoorToPortal;