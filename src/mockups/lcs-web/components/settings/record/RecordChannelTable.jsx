import React from 'react';
import { NativeSelect } from '../../common';
import { useTranslation } from '../../../i18n';

export function RecordChannelTable({ channelRows, setChannelRows }) {
  const { t } = useTranslation('record');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="lcs-web-card mb-4">
      <h3 className="lcs-web-card-inner-title">{t('cardTitleRecord', '录制设置')}</h3>
      <div className="lcs-web-table-card">
        <table className="lcs-web-data-table">
          <thead>
            <tr>
              <th>{t('colChannel', '录制通道')}</th>
              <th>{t('colName', '录制名称')}</th>
              <th>{t('colFormat', '录制格式')}</th>
              <th>{t('colResolution', '录制分辨率')}</th>
              <th>{t('colBitrate', '录制码率')}</th>
              <th>{t('colFramerate', '录制帧率')}</th>
              <th>{t('colEncoding', '录制编码')}</th>
              <th>{t('colIsRecord', '是否录制')}</th>
            </tr>
          </thead>
          <tbody>
            {channelRows.map((row, idx) => (
              <tr key={row.id}>
                <td>{tCommon('channels.' + row.id, row.channel)}</td>
                <td>
                  <input
                    type="text"
                    className="lcs-web-compact-input"
                    value={row.name}
                    onChange={e => {
                      const val = e.target.value;
                      setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, name: val } : r));
                    }}
                  />
                </td>
                <td>
                  <NativeSelect
                    value={row.format}
                    options={['MP4', 'TS']}
                    onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, format: val } : r))}
                  />
                </td>
                <td>
                  <NativeSelect
                    value={row.res}
                    options={['3840*2160', '1920*1080', '1280*720']}
                    onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, res: val } : r))}
                  />
                </td>
                <td>
                  <NativeSelect
                    value={row.bitrate}
                    options={['4096Kbps', '2048Kbps', '1024Kbps', '512Kbps']}
                    onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, bitrate: val } : r))}
                  />
                </td>
                <td>
                  <NativeSelect
                    value={row.fps}
                    options={['30fps', '25fps', '60fps']}
                    onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, fps: val } : r))}
                  />
                </td>
                <td>
                  <NativeSelect
                    value={row.codec}
                    options={['H265', 'H264']}
                    onChange={val => setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, codec: val } : r))}
                  />
                </td>
                <td>
                  <label className="lcs-web-switch">
                    <input
                      type="checkbox"
                      checked={row.isRecord}
                      onChange={e => {
                        const checked = e.target.checked;
                        setChannelRows(curr => curr.map((r, i) => i === idx ? { ...r, isRecord: checked } : r));
                      }}
                    />
                    <span className="slider" />
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
