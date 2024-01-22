import React, { useState, useEffect } from 'react';

function LiveStream() {
  const [isLive, setIsLive] = useState(false);
  const [streamDuration, setStreamDuration] = useState(0);

  const startLiveStream = () => {
    setIsLive(true);
  };

  const endLiveStream = () => {
    setIsLive(false);
  };

  useEffect(() => {
    let timer;
    if (isLive) {
      timer = setInterval(() => {
        setStreamDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isLive]);

  return (
    <div>
      {!isLive ? (
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={startLiveStream}
        >
          Start Live Stream
        </button>
      ) : (
        <div>
          <p>Live Duration: {streamDuration} seconds</p>
          {/* Include your video streaming component here */}
          <button
            type="button"
            onClick={endLiveStream}
          >
            End Live Stream
          </button>
        </div>
      )}
    </div>
  );
}

export default LiveStream;
