import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import api from "../../api";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const CCTV = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const onDrop = (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("original_video", file); // 서버에서 기대하는 필드 이름으로 수정
    });

    // FormData 내용 확인
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    api
      .post(`/api/fire_detection/video/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Upload Success:", response.data);
        fetchVideos(); // 파일 업로드 후 영상 목록 다시 가져오기
      })
      .catch((error) => {
        console.log(
          "Upload Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const fetchVideos = () => {
    api
      .get(`/api/fire_detection/video/list`)
      .then((response) => {
        console.log("Fetch Videos Success:", response.data);
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
        console.log(
          "Fetch Videos Error:",
          error.response ? error.response.data : error.message
        );
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
    <Box sx={{ flexGrow: 1, p: 3, background: "transparent" }}>
      <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: 'clamp(1rem, 3.5vw, 2rem)',
            }}
          >
        CCTV - 화재감지
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          background: "#ffffff",
          border: "1px solid #e9ebf2",
          borderRadius: "1.6rem",
          display: "flex",
          flexDirection: "column",
          mb: "1.4rem",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ pb: "1.4rem" }}>
          LIVE
        </Typography>
        {featuredVideo && (
          <Box sx={{ width: "100%", mb: 3 }}>
            <video 
              width="100%" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src={featuredVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          background: "#ffffff",
          border: "1px solid #e9ebf2",
          borderRadius: "1.6rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" gutterBottom >
          CCTV 목록
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Button
            variant="outlined"
            {...getRootProps({ style: { marginRight: "10px" } })}
          >
            <input {...getInputProps()} />
            Upload
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (isDeleteMode) {
                // deleteSelectedVideos(); // deleteSelectedVideos 함수가 아직 정의되지 않았으므로 주석 처리
                setIsDeleteMode(false);
              } else {
                setIsDeleteMode(true);
              }
            }}
          >
            {isDeleteMode ? "Confirm Delete" : "Delete"}
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "70%",
            position: "relative",
            overflowY: "auto",
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
          }}
        >
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <Box
                key={index}
                sx={{
                  margin: "10px",
                  width: { xs: "100%", sm: "45%", md: "30%", lg: "22%" },
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "relative", cursor: "pointer" }}>
                  <video
                    width="100%"
                    onClick={() => handleVideoSelect(video.key)}
                  >
                    <source src={video.url} type="video/mp4" />
                  </video>
                  <Button
                    sx={{
                      marginTop: "10px",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      position: "absolute",
                      bottom: "10px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                    onClick={() => openModal(video.url)}
                  >
                    Play
                  </Button>
                </Box>
                <Typography variant="body2" sx={{ fontSize: "12px" }}>
                  {video.title}
                </Typography>
                {isDeleteMode && selectedVideos.includes(video.key) && (
                  <Typography variant="body2" sx={{ color: "red" }}>
                    Selected
                  </Typography>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body1">No videos available</Typography>
          )}
        </Box>
        <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="lg" fullWidth>
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Video Player</Typography>
              {/* <Button
                onClick={closeModal}
                sx={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                x
              </Button> */}
            </Box>
          </DialogTitle>
          <DialogContent>
            {currentVideo && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <video width="100%" controls>
                  <source src={currentVideo} type="video/mp4" />
                </video>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default CCTV;
