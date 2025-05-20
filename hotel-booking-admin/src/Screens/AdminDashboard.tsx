import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface Booking {
  _id: string;
  fullName: string;
  email: string;
  numberOfGuests: number;
  checkInDate: string;
  checkOutDate: string;
  roomNumber: number;
  roomType: string;
}

interface Room {
  _id: string;
  room_number: string;
  room_name: string;
  description: string;
  price_per_night: number;
  max_guests: number;
  imageUrls: string[];
  type: string;
  amenities: string[];
}

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<'bookings' | 'rooms' | 'users'>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Search states
  const [bookingSearch, setBookingSearch] = useState('');
  const [roomSearch, setRoomSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeMenu]);

  const fetchData = async () => {
    try {
      const endpoint = `http://10.0.1.163:3000/api/${activeMenu}`;
      const res = await axios.get(endpoint);
      if (activeMenu === 'bookings') setBookings(res.data);
      else if (activeMenu === 'rooms') setRooms(res.data);
      else if (activeMenu === 'users') setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleDelete = async (id: string, type: 'booking' | 'room' | 'user') => {
    try {
      await axios.delete(`http://10.0.1.163:3000/api/${type}s/${id}`);
      fetchData();
    } catch (err) {
      console.error(`Failed to delete ${type}:`, err);
    }
  };

  const actionButtons = (id: string, type: 'booking' | 'room' | 'user') => (
    <div style={{ display: 'flex', gap: '6px' }}>
      {type !== 'booking' && (
        <button onClick={() => alert(`Edit ${type} feature coming soon!`)} style={btnStyle}>Edit</button>
      )}
      <button onClick={() => handleDelete(id, type)} style={{ ...btnStyle, backgroundColor: '#e74c3c' }}>Delete</button>
    </div>
  );

  // Filtered data based on search
  const filteredBookings = bookings.filter(b =>
    b.fullName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.email.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.roomType.toLowerCase().includes(bookingSearch.toLowerCase()) ||
    b.roomNumber.toString().includes(bookingSearch)
  );

  const filteredRooms = rooms.filter(r =>
    r.room_name.toLowerCase().includes(roomSearch.toLowerCase()) ||
    r.room_number.toString().includes(roomSearch) ||
    r.type.toLowerCase().includes(roomSearch.toLowerCase()) ||
    r.description.toLowerCase().includes(roomSearch.toLowerCase())
  );

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const renderTable = () => {
    if (activeMenu === 'bookings') {
      return (
        <section>
          <input
            type="text"
            placeholder="Search bookings..."
            value={bookingSearch}
            onChange={e => setBookingSearch(e.target.value)}
            style={searchInputStyle}
          />
          <h2 style={sectionTitle}>📑 All Bookings</h2>
          <div style={scrollContainer}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Guests</th>
                  <th>Room</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(b => (
                  <tr key={b._id} style={rowStyle}>
                    <td>{b.fullName}</td>
                    <td>{b.email}</td>
                    <td>{b.numberOfGuests}</td>
                    <td>{b.roomNumber} ({b.roomType})</td>
                    <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                    <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                    <td>{actionButtons(b._id, 'booking')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    if (activeMenu === 'rooms') {
      return (
        <section>
          <input
            type="text"
            placeholder="Search rooms..."
            value={roomSearch}
            onChange={e => setRoomSearch(e.target.value)}
            style={searchInputStyle}
          />
          <h2 style={sectionTitle}>🛏️ Manage Rooms</h2>
          <div style={scrollContainer}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Room Name</th>
                  <th>Number</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Max Guests</th>
                  <th>Amenities</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map(r => (
                  <tr key={r._id} style={rowStyle}>
                    <td>
                      {r.imageUrls[0] && (
                        <img src={r.imageUrls[0]} alt="Room" style={{ width: '100px', borderRadius: '8px' }} />
                      )}
                    </td>
                    <td>{r.room_name}</td>
                    <td>{r.room_number}</td>
                    <td>{r.type}</td>
                    <td>₱{r.price_per_night}</td>
                    <td>{r.max_guests}</td>
                    <td>{r.amenities.join(', ')}</td>
                    <td>{r.description}</td>
                    <td>{actionButtons(r._id, 'room')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    }

    if (activeMenu === 'users') {
      return (
        <section>
          <input
            type="text"
            placeholder="Search users..."
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
            style={searchInputStyle}
          />
          <h2 style={sectionTitle}>👥 Registered Users</h2>
          <div style={scrollContainer}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u._id} style={rowStyle}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.isAdmin ? 'Yes' : 'No'}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>{actionButtons(u._id, 'user')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      <aside style={sidebarStyle}>
        <div style={adminIconBox}>
          <div style={adminIcon}>A</div>
          <p style={{ marginTop: '8px' }}>Admin@gmail.com</p>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
          {['bookings', 'rooms', 'users'].map(item => (
            <li
              key={item}
              style={{
                ...sidebarItem,
                backgroundColor: activeMenu === item ? '#007EF2' : 'transparent',
              }}
              onClick={() => setActiveMenu(item as any)}
            >
              {item === 'bookings' ? '📑 View All Bookings' : item === 'rooms' ? '🛏️ Manage Rooms' : '👥 View Users'}
            </li>
          ))}
        </ul>
      </aside>

      <main style={mainContentStyle}>
  <h1
    style={{
      fontSize: '32px',
      marginBottom: '20px',
      color: '#007EF2',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      fontWeight: 'bold',
      letterSpacing: '1px',
    }}
  >
    🏨 W A N D E R S T A Y Admin Dashboard
  </h1>
  <hr style={{ marginBottom: '20px' }} />

  <div style={{ width: '100%', flex: 1 }}>
    {renderTable()}
  </div>
</main>


    </div>
  );
};

// Styles (keep your existing styles + add search input style)
const searchInputStyle: React.CSSProperties = {
  width: '50%',
  padding: '10px 16px',
  fontSize: '15px',
  marginBottom: '12px',
  borderRadius: '12px',
  border: '1.5px solid #ddd',
  boxSizing: 'border-box',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  outline: 'none',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#333',
};

const sidebarStyle: React.CSSProperties = {
  width: '260px',
  backgroundColor: '#F9A826',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '30px'
};

const sidebarItem: React.CSSProperties = {
  width: '90%',
  padding: '12px 16px',
  borderRadius: '6px',
  margin: '6px 0',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'background 0.3s'
};


const adminIconBox: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '32px',
  cursor: 'default',
};

const adminIcon: React.CSSProperties = {
  width: '80px',
  height: '80px',
  margin: '0 auto',
  borderRadius: '50%',
  backgroundColor: '#2260FF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ECF0F1',
};

const mainContentStyle: React.CSSProperties = {
  flex: 1,
  padding: '20px 60px',
  backgroundColor: '#F5F7FA',
  overflowY: 'auto'
};

const scrollContainer: React.CSSProperties = {
  maxHeight: '70vh',
  overflowY: 'auto',
  marginTop: '16px',
  border: '1px solid #ccc',
  borderRadius: '6px'
};

const sectionTitle: React.CSSProperties = {
  fontSize: '22px',
  marginBottom: '10px',
  color: '#333',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 10px',
  fontSize: '15px'
};

const rowStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
  padding: '12px'
};

const btnStyle: React.CSSProperties = {
  padding: '6px 12px',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default AdminDashboard;

