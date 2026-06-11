import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminPanel } from '../components/AdminPanel'
import { useAdmin } from '../context/AdminContext'

const tabs = ['Overview', 'Addons & passes', 'Usage details', 'Plan & device', 'My profile']

function DataUsageCard({ used, total, pct }: { used: string; total: string; pct: number }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: '200px' }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#111827' }}>{used}</span>
          <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '6px' }}>used /{total} total</span>
        </div>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px' }}>
          High Speed Data | Reduced speeds after 100% of data is reached.
        </p>
        <div style={{ height: '8px', borderRadius: '999px', backgroundColor: '#e5e7eb', overflow: 'hidden', marginBottom: '10px' }}>
          <div style={{ height: '100%', width: `${pct}%`, backgroundColor: '#DB5C05', borderRadius: '999px' }} />
        </div>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{pct}% of total data used</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#111827', textDecoration: 'underline', textAlign: 'right', padding: 0 }}>View Usage Details</button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#111827', textDecoration: 'underline', textAlign: 'right', padding: 0 }}>Buy a One-Time Pass</button>
      </div>
    </div>
  )
}

export function Overview() {
  const navigate = useNavigate()
  const { adminOpen } = useAdmin()
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Top utility bar */}
      <div style={{ backgroundColor: '#111827', padding: '10px 16px', display: 'flex', justifyContent: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
        <span style={{ color: '#d1d5db', fontSize: '13px', cursor: 'pointer' }}>ON</span>
        <span style={{ color: '#d1d5db', fontSize: '13px', cursor: 'pointer' }}>Find a store</span>
        <span style={{ color: '#d1d5db', fontSize: '13px', cursor: 'pointer' }}>Contact us</span>
      </div>

      {/* Main nav */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', gap: '16px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: 0 }}>
          <img src="/logo-black.svg" alt="Freedom Mobile" style={{ height: '28px', cursor: 'pointer', flexShrink: 0 }} onClick={() => navigate('/')} />
          <div style={{ display: 'none' }} className="md:flex" />
          {['Mobile', 'TV+ Internet', 'Network', 'Back to school offers'].map(link => (
            <span key={link} style={{ fontSize: '14px', color: '#374151', cursor: 'pointer', whiteSpace: 'nowrap' }}>{link}</span>
          ))}
        </div>
        <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>My Freedom</span>
      </div>

      {/* Account header */}
      <div style={{ backgroundColor: '#f3f4f6', padding: '24px 16px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(24px, 6vw, 32px)', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>Hi, John</h1>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Account Number: LINKED ACCOUNT</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px solid #111827', paddingBottom: '4px', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '15px', color: '#111827' }}>(123) 456-7890</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4-4 4 4M4 10l4 4 4-4" stroke="#DB5C05" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ backgroundColor: '#f3f4f6', padding: '24px 16px 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '0', borderBottom: '1px solid #e5e7eb', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 0', marginRight: '24px',
                fontSize: '14px', color: activeTab === tab ? '#111827' : '#6b7280',
                fontWeight: activeTab === tab ? 600 : 400,
                borderBottom: activeTab === tab ? '3px solid #DB5C05' : '3px solid transparent',
                marginBottom: '-1px', whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Billing card */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 1px 6px rgba(0,0,0,0.08)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flexShrink: 0 }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', margin: '0 0 8px' }}>Amount Due</p>
              <p style={{ fontSize: '36px', fontWeight: 700, color: '#111827', margin: 0 }}>$117.52</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
              <button style={{ backgroundColor: '#DB5C05', color: '#fff', border: 'none', borderRadius: '999px', padding: '12px 24px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>Pay Now</button>
              <button style={{ backgroundColor: '#fff', color: '#111827', border: '2px solid #111827', borderRadius: '999px', padding: '10px 20px', fontSize: '15px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>Download Bill</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Payment Due Date:', value: 'Mar. 10, 2020' },
              { label: 'Billing Period:', value: 'Feb. 25 - Mar 24 2020' },
              { label: 'Auto Payment:', value: 'Activate Now and Save $5/mo.' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ color: '#374151' }}>{row.label}</span>
                <span style={{ color: '#111827' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Freedom Data */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>Freedom Data</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 16px' }}>Optional copy dolor sit amet, consectetur adipiscing elit.</p>
          <DataUsageCard used="5.6GB" total="25GB" pct={22} />
        </div>

        {/* Nationwide Data */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>Nationwide Data</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 16px' }}>Optional copy dolor sit amet, consectetur adipiscing elit.</p>
          <DataUsageCard used="1.6GB" total="25GB" pct={6} />
        </div>

      </div>
      {adminOpen && <AdminPanel />}
    </div>
  )
}
