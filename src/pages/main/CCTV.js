import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Modal from 'react-modal';
import axios from 'axios';

// 모달의 root 요소를 설정합니다.
Modal.setAppElement('#root');

const CCTV = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const API_URL = 'http://127.0.0.1:8000';

  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('original_video', file); // 서버에서 기대하는 필드 이름으로 수정
    });

    // FormData 내용 확인
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    axios.post(`${API_URL}/api/theft_detection/video/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log('Upload Success:', response.data);
        fetchVideos(); // 파일 업로드 후 영상 목록 다시 가져오기
      })
      .catch((error) => {
        console.log('Upload Error:', error.response ? error.response.data : error.message);
      });
  };

  const fetchVideos = () => {
    axios.get(`${API_URL}/api/theft_detection/video/list`)
      .then((response) => {
        console.log('Fetch Videos Success:', response.data);
        const urls = response.data.processed_videos.map((url, index) => ({
          url: url,
          key: index.toString(),
          title: `Video ${index + 1}`,
        }));
        setVideos(urls);
        if (urls.length > 0) {
          setFeaturedVideo(urls[0].url);
        }
      })
      .catch((error) => {
        console.log('Fetch Videos Error:', error.response ? error.response.data : error.message);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleVideoSelect = (key) => {
    if (selectedVideos.includes(key)) {
      setSelectedVideos(selectedVideos.filter((item) => item !== key));
    } else {
      setSelectedVideos([...selectedVideos, key]);
    }
  };

  const openModal = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div style={{ height: '160vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '80%', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <button {...getRootProps({ style: { marginRight: '10px' } })}>
          <input {...getInputProps()} />
          Upload
        </button>
        <button
          onClick={() => {
            if (isDeleteMode) {
              // deleteSelectedVideos(); // deleteSelectedVideos 함수가 아직 정의되지 않았으므로 주석 처리
            } else {
              setIsDeleteMode(true);
            }
          }}
        >
          {isDeleteMode ? 'Confirm Delete' : 'Delete'}
        </button>
      </div>
      {featuredVideo && (
        <div style={{ width: '80%', marginBottom: '20px' }}>
          <video width="100%" controls>
            <source src={featuredVideo} type="video/mp4" />
          </video>
        </div>
      )}
      <div
        style={{
          width: '80%',
          height: '70%',
          border: '2px solid black',
          borderRadius: '15px',
          position: 'relative',
        }}
      >
        <div style={{ overflowY: 'scroll', height: '100%', padding: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div key={index} style={{ margin: '10px', width: '18%', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                  <video width="100%" onClick={() => handleVideoSelect(video.key)}>
                    <source src={video.url} type="video/mp4" />
                  </video>
                  <button
                    style={{
                      marginTop: '10px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                    onClick={() => openModal(video.url)}
                  >
                    Play
                  </button>
                </div>
                <p style={{ fontSize: '12px' }}>{video.title}</p>
                {isDeleteMode && selectedVideos.includes(video.key) && <p style={{ color: 'red' }}>Selected</p>}
              </div>
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
          }
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
          <h2>Video Player</h2>
          <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>
        {currentVideo && (
          <div style={{ width: '100%', height: 'calc(100% - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <video width="100%" height="100%" controls>
              <source src={currentVideo} type="video/mp4" />
            </video>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CCTV;
