import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://edtech-exam-api.vercel.app/api';
// Toggle to local MERN backend by uncommenting:
// const API_BASE_URL = 'http://localhost:5000/api';

function BidDetail() {
  const params = useParams() || {};
  const { id } = params;
  const navigate = useNavigate();
  const [bid, setBid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBidDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE_URL}/bids?id=${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch bid details');
        }
        const responseData = await response.json();
        
        // Handle API response format: response.data contains the single bid object
        if (responseData && responseData.data) {
          setBid(responseData.data);
        } else {
          setError('Bid details not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBidDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="detail-card" style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !bid) {
    return (
      <div className="page-container">
        <div className="detail-card" style={{ textAlign: 'center', padding: '48px' }}>
          <p style={{ color: 'var(--color-unresponded)', fontWeight: 600, marginBottom: '20px' }}>
            {error || 'Bid details not found'}
          </p>
          <button type="button" className="back-btn" onClick={() => navigate('/')}>
            Back to Bids
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="detail-card">
        <div className="detail-header">
          <h2>Bid Details</h2>
          <button 
            type="button" 
            className="back-btn"
            onClick={() => navigate('/')}
          >
            Back
          </button>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <span className="detail-label">Bid Number</span>
            <span className="detail-value">{bid.bidNumber}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Created By</span>
            <span className="detail-value">{bid.createdBy}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Start Date</span>
            <span className="detail-value">{bid.startDate}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Start Time</span>
            <span className="detail-value">{bid.startTime}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Time Remaining</span>
            <span className="detail-value">{bid.timeRemaining}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">From City</span>
            <span className="detail-value">{bid.fromCity}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">To City</span>
            <span className="detail-value">{bid.toCity}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Vehicle Type</span>
            <span className="detail-value">{bid.vehicleType}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Body Type</span>
            <span className="detail-value">{bid.bodyType}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Number of Vehicles</span>
            <span className="detail-value">{bid.noOfVehicles}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Material Weight</span>
            <span className="detail-value">{bid.materialWeight} kg</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Response Count</span>
            <span className="detail-value">{bid.response}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Assigned Staff</span>
            <span className="detail-value">{bid.assignedStaff || 'N/A'}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Staff ID</span>
            <span className="detail-value">{bid.staffId || 'N/A'}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Status</span>
            <div>
              <span className={`status-badge ${bid.status.toLowerCase()}`}>
                {bid.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { BidDetail };
export default BidDetail;
