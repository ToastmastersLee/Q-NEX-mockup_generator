import React from 'react';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  Search,
  Trash2,
} from 'lucide-react';
import { useTranslation } from '../../i18n';

export function RecordingsTable({
  filteredRows,
  selectedIds,
  isSelectAll,
  activePlayId,
  expandedSessions,
  searchKeyword,
  setSearchKeyword,
  currentPage,
  setCurrentPage,
  goToPageInput,
  setGoToPageInput,
  totalRowsCount,
  handlePlay,
  toggleSelectAll,
  toggleRowSelect,
  toggleSessionExpand,
}) {
  const { t } = useTranslation('recordings');

  return (
    <div className="lcs-web-recordings-right">
      {/* Search & Actions Toolbar */}
      <div className="lcs-web-recordings-toolbar">
        <div className="lcs-web-search-box-wrap">
          <input
            type="text"
            placeholder={t('searchPlaceholder', 'Enter keyword search')}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="lcs-web-search-input"
          />
          <span className="lcs-web-search-counter">0/6</span>
        </div>

        <div className="lcs-web-date-range-box">
          <Calendar size={14} className="lcs-web-calendar-icon" />
          <input type="text" placeholder={t('startDate', 'Start Date')} className="lcs-web-date-input" />
          <span className="lcs-web-date-sep">-</span>
          <input type="text" placeholder={t('endDate', 'End Date')} className="lcs-web-date-input" />
        </div>

        <button className="lcs-web-btn-search" type="button">
          <Search size={14} />
          <span>{t('search', 'Search')}</span>
        </button>

        <button className="lcs-web-btn-download" type="button">
          <Download size={14} />
          <span>{t('download', 'Download')}</span>
        </button>

        <button className="lcs-web-btn-delete" type="button">
          <Trash2 size={14} />
          <span>{t('delete', 'Delete')}</span>
        </button>
      </div>

      {/* Video Table Container */}
      <div className="lcs-web-table-card">
        <table className="lcs-web-recordings-table">
          <thead>
            <tr>
              <th className="th-checkbox">
                <input
                  type="checkbox"
                  checked={isSelectAll || (selectedIds.length > 0 && selectedIds.length === totalRowsCount)}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>{t('speaker', 'Speaker')}</th>
              <th>{t('topic', 'Topic')}</th>
              <th>{t('fileName', 'Name')}</th>
              <th>{t('fileSize', 'Size')}</th>
              <th>{t('startTime', 'StartTime')}</th>
              <th>{t('recDuration', 'Duration')}</th>
              <th>{t('operation', 'Operation')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => {
              const isSelected = selectedIds.includes(row.id);
              const isPlayingRow = activePlayId === row.id;
              const isSessionExpanded = expandedSessions[row.session];

              if (!row.isHeader && !isSessionExpanded) {
                return null;
              }

              return (
                <tr
                  key={row.id}
                  className={`${row.isHeader ? 'session-header-row' : 'sub-row'} ${isSelected ? 'row-selected' : ''}`}
                >
                  <td className="td-checkbox">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRowSelect(row.id)}
                    />
                  </td>
                  <td>{row.speaker}</td>
                  <td>{row.topic}</td>
                  <td className="td-name">
                    <span title={row.name}>{row.name}</span>
                  </td>
                  <td>{row.size}</td>
                  <td>{row.startTime}</td>
                  <td>{row.duration}</td>
                  <td className="td-action">
                    <div className="action-wrap">
                      <button
                        type="button"
                        className={`btn-play-link ${isPlayingRow ? 'is-playing' : ''}`}
                        onClick={() => handlePlay(row)}
                      >
                        {t('play', 'Play')}
                      </button>
                      {row.isHeader && (
                        <button
                          type="button"
                          className="btn-expand-arrow"
                          onClick={() => toggleSessionExpand(row.session)}
                        >
                          {isSessionExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer & Pagination */}
      <div className="lcs-web-table-footer">
        <div className="lcs-web-footer-left">
          <label className="lcs-web-select-all-label">
            <input
              type="checkbox"
              checked={isSelectAll || (selectedIds.length > 0 && selectedIds.length === totalRowsCount)}
              onChange={toggleSelectAll}
            />
            <span>{t('selectAll', 'Select All')}</span>
          </label>
          <span className="lcs-web-total-count">{t('total', 'Total 99')}</span>
        </div>

        <div className="lcs-web-pagination">
          <button
            type="button"
            className="lcs-web-page-nav"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            &lt;
          </button>
          {[1, 2, 3, 4, 5, 6, 7].map(num => (
            <button
              key={num}
              type="button"
              className={`lcs-web-page-num ${currentPage === num ? 'is-active' : ''}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className="lcs-web-page-nav"
            onClick={() => setCurrentPage(prev => Math.min(7, prev + 1))}
          >
            &gt;
          </button>
        </div>

        <div className="lcs-web-goto-wrap">
          <span>{t('goTo', 'Go to')}</span>
          <input
            type="text"
            value={goToPageInput}
            onChange={e => setGoToPageInput(e.target.value)}
            className="lcs-web-goto-input"
          />
          <span>{t('pageUnit', 'Page')}</span>
        </div>
      </div>
    </div>
  );
}
