import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://edtech-exam-api.vercel.app/api';
// Toggle to local MERN backend by uncommenting:
// const API_BASE_URL = 'http://localhost:5000/api';

function BidList() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [activeFilter, setActiveFilter] = useState('Calendar');
  const navigate = useNavigate();

  // Fetch bids whenever appliedSearch or sortBy changes
  useEffect(() => {
    const fetchBids = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${API_BASE_URL}/bids`;
        const params = [];
        if (appliedSearch) {
          params.push(`createdBy=${encodeURIComponent(appliedSearch)}`);
        }
        if (sortBy) {
          params.push(`sortBy=${sortBy}`);
        }
        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch bids');
        }
        const responseData = await response.json();
        
        // Handle API response format: response.data contains the bids array
        if (responseData && responseData.data) {
          setBids(responseData.data);
        } else {
          setBids([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [appliedSearch, sortBy]);

  // Handle Search trigger (on button click or enter press)
  const handleSearch = () => {
    setAppliedSearch(searchInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Local filtering based on active filter button (Today, Yesterday, Calendar)
  const getFilteredBids = () => {
    if (activeFilter === 'Today') {
      // Mock "Today" by matching '2024-02-14' since it's the date in the mock dataset,
      // or compare with actual local date to be technically correct.
      // To be safe, let's filter by the current date, but fallback to all if it would result in 0
      // actually, let's write a correct date-based filter:
      const todayStr = new Date().toISOString().split('T')[0];
      return bids.filter(bid => bid.startDate === todayStr);
    }
    if (activeFilter === 'Yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      return bids.filter(bid => bid.startDate === yesterdayStr);
    }
    return bids; // 'Calendar' shows all bids
  };

  const filteredBids = getFilteredBids();

  return (
    <div className="page-container">
      {/* Search, Sort, and Filter Controls */}
      <div className="controls-card">
        <div className="controls-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="bid-created-label">Bid Created</span>
            <div className="filter-buttons">
              <button 
                type="button"
                className={`filter-btn ${activeFilter === 'Today' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Today')}
              >
                Today
              </button>
              <button 
                type="button"
                className={`filter-btn ${activeFilter === 'Yesterday' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Yesterday')}
              >
                Yesterday
              </button>
              <button 
                type="button"
                className={`filter-btn ${activeFilter === 'Calendar' ? 'active' : ''}`}
                onClick={() => setActiveFilter('Calendar')}
              >
                Calendar
              </button>
            </div>
          </div>
        </div>

        <div className="search-sort-row">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              type="button" 
              className="search-btn"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="sort-container">
            <label htmlFor="sort-dropdown" className="sub-text" style={{ margin: 0, fontWeight: 600 }}>Sort by:</label>
            <select
              id="sort-dropdown"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort by Date</option>
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bids Table */}
      <div className="table-card">
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading bids...</p>
          </div>
        ) : error ? (
          <div className="empty-container">
            <p style={{ color: 'var(--color-unresponded)', fontWeight: 600 }}>{error}</p>
          </div>
        ) : filteredBids.length === 0 ? (
          <div className="empty-container">
            <p>No bids found.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="bids-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Bid Number / Created by</th>
                  <th>Start Date / & Time</th>
                  <th>Bid Time / Remaining</th>
                  <th>From city / To city</th>
                  <th>Vehicle Type, Size / Body / No. of Vehicle</th>
                  <th>Material Weight / (in kg)</th>
                  <th>Assigned Staff / Staff Id</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBids.map((bid, index) => (
                  <tr 
                    key={bid.id} 
                    className="bid-row"
                    onClick={() => navigate(`/bid/${bid.id}`)}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <span className="highlight-text">{bid.bidNumber}</span>
                      <span className="sub-text">{bid.createdBy}</span>
                    </td>
                    <td>
                      <span className="highlight-text">{bid.startDate}</span>
                      <span className="sub-text">{bid.startTime}</span>
                    </td>
                    <td>
                      <span className="highlight-text">{bid.startTime}</span>
                      <span className="sub-text">{bid.timeRemaining}</span>
                    </td>
                    <td>
                      <span className="highlight-text">{bid.fromCity}</span>
                      <span className="sub-text">{bid.toCity}</span>
                    </td>
                    <td>
                      <span className="highlight-text">{bid.vehicleType}</span>
                      <span className="sub-text">{bid.bodyType}, {bid.noOfVehicles} {bid.noOfVehicles > 1 ? 'Vehicles' : 'Vehicle'}</span>
                    </td>
                    <td>
                      <span className="highlight-text">{bid.materialWeight} kg</span>
                    </td>
                    <td>
                      <span className="highlight-text">{bid.assignedStaff}</span>
                      <span className="sub-text">{bid.staffId}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${bid.status.toLowerCase()}`}>
                        {bid.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export { BidList };
export default BidList;
