import React, { useState } from 'react';
import { RecordingPlayerCard } from './RecordingPlayerCard';
import { RecordingsTable } from './RecordingsTable';

const initialRecordingRows = [
  { id: '1-1', session: 1, isHeader: true, expanded: true, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '713.57MB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-2', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Lecture.mp4', size: '137.38MB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-3', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Lecture2.mp4', size: '374.34MB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-4', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'PGM.mp4', size: '1.12GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-5', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Student_C.mp4', size: '2.58GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-6', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Student_P.mp4', size: '2.58GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-7', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Teacher_C.mp4', size: '1.96GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '1-8', session: 1, isHeader: false, speaker: 'Null', topic: 'Null', name: 'Teacher_P.mp4', size: '2.45GB', startTime: '2026-08-21 09:42:53', duration: '01:24:25' },
  { id: '2-1', session: 2, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '758.32KB', startTime: '2026-08-21 09:42:11', duration: '00:00:27' },
  { id: '3-1', session: 3, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '384.44KB', startTime: '2026-08-20 11:17:09', duration: '00:00:14' },
  { id: '4-1', session: 4, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '112.56KB', startTime: '2026-08-17 12:23:14', duration: '00:00:04' },
  { id: '5-1', session: 5, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '390.73MB', startTime: '2026-08-14 14:28:51', duration: '04:00:05' },
  { id: '6-1', session: 6, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '256.42KB', startTime: '2026-08-14 09:42:02', duration: '00:00:10' },
  { id: '7-1', session: 7, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '102.93MB', startTime: '2026-08-13 10:38:27', duration: '01:03:14' },
  { id: '8-1', session: 8, isHeader: true, expanded: false, speaker: 'Null', topic: 'Null', name: 'Interactive.mp4', size: '56.44KB', startTime: '2026-08-13 10:18:19', duration: '00:00:02' },
];

export function RecordingsPage() {
  const [selectedIds, setSelectedIds] = useState(['1-4']); // PGM.mp4 selected by default
  const [activePlayId, setActivePlayId] = useState('1-4'); // Track currently playing video
  const [expandedSessions, setExpandedSessions] = useState({ 1: true });
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPageInput, setGoToPageInput] = useState('1');
  const [isSelectAll, setIsSelectAll] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState({
    name: 'PGM.mp4',
    creationTime: '2026-08-21 09:42:53',
    duration: '01:24:23.99',
    bitrate: '1901 kb/s',
    audioSampling: '48000 Hz',
    videoCode: 'hevc (Main)',
    audioCode: 'aac',
    frameRate: '29.96 fps',
    audioChannel: 'stereo',
    resolution: '3840x2160',
  });

  const handlePlay = (row) => {
    setActivePlayId(row.id);
    setIsPlaying(true);
    if (!selectedIds.includes(row.id)) {
      setSelectedIds([row.id]);
    }
    setSelectedVideo({
      name: row.name,
      creationTime: row.startTime,
      duration: row.duration + '.99',
      bitrate: row.name.includes('PGM') ? '1901 kb/s' : '2048 kb/s',
      audioSampling: '48000 Hz',
      videoCode: 'hevc (Main)',
      audioCode: 'aac',
      frameRate: '29.96 fps',
      audioChannel: 'stereo',
      resolution: row.name.includes('PGM') ? '3840x2160' : '1920x1080',
    });
  };

  const toggleSelectAll = () => {
    if (isSelectAll || selectedIds.length > 0) {
      setSelectedIds([]);
      setIsSelectAll(false);
    } else {
      setSelectedIds(initialRecordingRows.map(r => r.id));
      setIsSelectAll(true);
    }
  };

  const toggleRowSelect = (id) => {
    setSelectedIds(curr => {
      const next = curr.includes(id) ? curr.filter(i => i !== id) : [...curr, id];
      setIsSelectAll(next.length === initialRecordingRows.length);
      return next;
    });
  };

  const toggleSessionExpand = (session) => {
    setExpandedSessions(curr => ({ ...curr, [session]: !curr[session] }));
  };

  const filteredRows = initialRecordingRows.filter(row => {
    if (!searchKeyword) return true;
    return (
      row.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      row.speaker.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      row.topic.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  return (
    <div className="lcs-web-recordings-page">
      <RecordingPlayerCard
        selectedVideo={selectedVideo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <RecordingsTable
        filteredRows={filteredRows}
        selectedIds={selectedIds}
        isSelectAll={isSelectAll}
        activePlayId={activePlayId}
        expandedSessions={expandedSessions}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        goToPageInput={goToPageInput}
        setGoToPageInput={setGoToPageInput}
        totalRowsCount={initialRecordingRows.length}
        handlePlay={handlePlay}
        toggleSelectAll={toggleSelectAll}
        toggleRowSelect={toggleRowSelect}
        toggleSessionExpand={toggleSessionExpand}
      />
    </div>
  );
}