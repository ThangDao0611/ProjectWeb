// import React, { useEffect, useState } from "react";
// import SpeechRecognition, {
//   useSpeechRecognition,
// } from "react-speech-recognition";

// const SpeechRecognition = ({ transcript, startListening, stopListening }) => {
//   const [content, setContent] = useState(null);

//   useEffect(() => {
//     setContent(transcript);
//   }, [transcript]);

//   return (
//     <div className="container">
//       <button className="button" onClick={() => startListening()}>
//         Start
//       </button>
//       <button className="button" onClick={() => stopListening()}>
//         Stop
//       </button>
//       <div className="content">{this.state.content}</div>
//     </div>
//   );
// };

// SearchVoice.propTypes = {
//   // Props injected by SpeechRecognition
//   transcript: PropTypes.string,
//   resetTranscript: PropTypes.func,
//   browserSupportsSpeechRecognition: PropTypes.bool,
//   startListening: PropTypes.func,
//   abortListening: PropTypes.func,
//   recognition: PropTypes.object,
// };

// const options = {
//   autoStart: false,
// };

// export default SpeechRecognition(options)(SpeechRecognition);
