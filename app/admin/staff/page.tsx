'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { isUserAdmin } from '@/lib/auth';
import {
  StaffMember,
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  defaultSampleStaff,
} from '@/lib/firestore';
import MobileSectionNav from '@/components/MobileSectionNav';

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/properties', label: 'Properties', icon: '🏘️' },
  { href: '/admin/projects', label: 'Projects', icon: '🏗️' },
  { href: '/admin/inquiries', label: 'Inquiries', icon: '📨' },
  { href: '/admin/staff', label: 'Staff', icon: '👔' },
  { href: '/admin/users?tab=users', label: 'Users', icon: '👥' },
  { href: '/admin/users?tab=admins', label: 'Admins', icon: '🛡️' },
];

const DEPARTMENTS = [
  'All Departments',
  'Executive Management',
  'Sales & Marketing',
  'Property Management',
  'Construction & Site',
  'Legal & Compliance',
  'Operations',
  'Finance & Accounts',
];

export default function AdminStaffPage() {
  const [authorized, setAuthorized] = useState(false);
  const [staffList, setStaffList] = useState<StaffMember[]>(defaultSampleStaff);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formDept, setFormDept] = useState('Sales & Marketing');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmpType, setFormEmpType] = useState<'Full-time' | 'Part-time' | 'Contract'>('Full-time');
  const [formStatus, setFormStatus] = useState<'Active' | 'On Leave' | 'Inactive'>('Active');
  const [formJoiningDate, setFormJoiningDate] = useState('');

  // Check auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = '/admin/login';
      } else if (!isUserAdmin(user.email)) {
        window.location.href = '/admin/login?error=unauthorized';
      } else {
        setAuthorized(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchStaffData = async () => {
    setLoading(true);
    try {
      const data = await getStaff();
      setStaffList(data);
    } catch (err) {
      console.error('Failed to load staff list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchStaffData();
    }
  }, [authorized]);

  const openAddModal = () => {
    setEditingStaff(null);
    setFormName('');
    setFormRole('');
    setFormDept('Sales & Marketing');
    setFormEmail('');
    setFormPhone('');
    setFormEmpType('Full-time');
    setFormStatus('Active');
    setFormJoiningDate(new Date().toISOString().split('T')[0]);
    setShowModal(true);
  };

  const openEditModal = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormName(staff.name);
    setFormRole(staff.role);
    setFormDept(staff.department);
    setFormEmail(staff.email);
    setFormPhone(staff.phone);
    setFormEmpType(staff.employmentType);
    setFormStatus(staff.status);
    setFormJoiningDate(staff.joiningDate);
    setShowModal(true);
  };

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formRole.trim()) {
      alert('Please fill in Name, Role, and Email.');
      return;
    }
    setSubmitting(true);
    try {
      if (editingStaff) {
        // Edit existing
        await updateStaff(editingStaff.id, {
          name: formName.trim(),
          role: formRole.trim(),
          department: formDept,
          email: formEmail.trim(),
          phone: formPhone.trim(),
          employmentType: formEmpType,
          status: formStatus,
          joiningDate: formJoiningDate,
        });
        setStaffList((prev) =>
          prev.map((s) =>
            s.id === editingStaff.id
              ? {
                  ...s,
                  name: formName.trim(),
                  role: formRole.trim(),
                  department: formDept,
                  email: formEmail.trim(),
                  phone: formPhone.trim(),
                  employmentType: formEmpType,
                  status: formStatus,
                  joiningDate: formJoiningDate,
                }
              : s
          )
        );
      } else {
        // Add new
        const created = await addStaff({
          name: formName.trim(),
          role: formRole.trim(),
          department: formDept,
          email: formEmail.trim(),
          phone: formPhone.trim(),
          employmentType: formEmpType,
          status: formStatus,
          joiningDate: formJoiningDate || new Date().toISOString().split('T')[0],
        });
        setStaffList((prev) => [created, ...prev]);
      }
      setShowModal(false);
    } catch (err) {
      console.error('Failed to save staff:', err);
      alert('An error occurred while saving staff details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStaff = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove staff member "${name}"?`)) {
      setStaffList((prev) => prev.filter((s) => s.id !== id));
      try {
        await deleteStaff(id);
      } catch (err) {
        console.error('Failed to delete staff:', err);
      }
    }
  };

  const handleToggleStatus = async (staff: StaffMember) => {
    const nextStatus: 'Active' | 'On Leave' | 'Inactive' =
      staff.status === 'Active' ? 'On Leave' : staff.status === 'On Leave' ? 'Inactive' : 'Active';

    setStaffList((prev) =>
      prev.map((s) => (s.id === staff.id ? { ...s, status: nextStatus } : s))
    );
    try {
      await updateStaff(staff.id, { status: nextStatus });
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Filtered List
  const filteredStaff = staffList.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchDept =
      selectedDept === 'All Departments' || s.department === selectedDept;

    const matchStatus =
      selectedStatus === 'All' || s.status === selectedStatus;

    return matchSearch && matchDept && matchStatus;
  });

  // Department counts
  const uniqueDepts = Array.from(new Set(staffList.map((s) => s.department)));
  const activeCount = staffList.filter((s) => s.status === 'Active').length;
  const leaveCount = staffList.filter((s) => s.status === 'On Leave').length;

  if (!authorized) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <p style={{ color: 'var(--text-light)', fontSize: '1rem' }}>Checking admin access...</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <MobileSectionNav title="Admin" items={adminNavItems} />
      <div className="responsive-sidebar-container">
        {/* Sidebar */}
        <div style={{ width: '250px', background: 'var(--primary)', color: '#fff', padding: '24px', display: 'flex', flexDirection: 'column' }} className="hide-mobile">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--secondary)', marginBottom: '32px' }}>
            HK Realty Admin
          </h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/admin" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              📊 Dashboard
            </Link>
            <Link href="/admin/properties" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              🏘️ Properties
            </Link>
            <Link href="/admin/projects" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              🏗️ Projects
            </Link>
            <Link href="/admin/inquiries" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              📨 Inquiries
            </Link>
            <Link href="/admin/staff" style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px', fontWeight: '600' }}>
              👔 Staff Management
            </Link>
            <Link href="/admin/users?tab=users" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              👥 Users
            </Link>
            <Link href="/admin/users?tab=admins" style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', borderRadius: '8px', transition: 'all 0.2s' }}>
              🛡️ Admins
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="responsive-main-content">
          <div className="container" style={{ maxWidth: '1200px', margin: '0' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--primary)', marginBottom: '8px' }}>
                  Staff Management
                </h1>
                <p style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Manage team members, roles, departments, and employment status.
                  {loading && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--secondary)', background: 'rgba(194,161,71,0.15)', padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>
                      Syncing
                    </span>
                  )}
                </p>
              </div>
              <button onClick={openAddModal} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>+</span> Add New Staff
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid-4" style={{ marginBottom: '28px' }}>
              {[
                { label: 'Total Staff', value: staffList.length.toString(), icon: '👔', color: 'var(--primary)' },
                { label: 'Active Staff', value: activeCount.toString(), icon: '🟢', color: '#10B981' },
                { label: 'On Leave', value: leaveCount.toString(), icon: '🟡', color: '#F59E0B' },
                { label: 'Departments', value: uniqueDepts.length.toString(), icon: '🏢', color: 'var(--secondary)' },
              ].map((m) => (
                <div key={m.label} className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: `4px solid ${m.color}` }}>
                  <div style={{ fontSize: '1.8rem' }}>{m.icon}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: '700', color: 'var(--primary)' }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{m.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter and Search Bar */}
            <div className="card" style={{ padding: '20px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              <input
                type="text"
                placeholder="Search by name, role, email, phone, ID..."
                className="form-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: '340px', width: '100%' }}
              />

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="form-input"
                  style={{ padding: '10px 14px', borderRadius: '8px', background: '#fff', fontSize: '0.88rem' }}
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="form-input"
                  style={{ padding: '10px 14px', borderRadius: '8px', background: '#fff', fontSize: '0.88rem' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Staff Table */}
            <div className="card responsive-table-container">
              <table style={{ width: '100%', minWidth: '760px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                      Staff Member
                    </th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                      Role & Department
                    </th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                      Contact
                    </th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                      Status
                    </th>
                    <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No staff members found matching the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((staff) => (
                      <tr key={staff.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                        {/* Member */}
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                              style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '50%',
                                background: 'var(--gradient-gold)',
                                color: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                fontSize: '0.95rem',
                                flexShrink: 0,
                              }}
                            >
                              {staff.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '0.95rem' }}>
                                {staff.name}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                <span
                                  style={{
                                    fontSize: '0.72rem',
                                    color: '#6B7280',
                                    background: '#F3F4F6',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontWeight: '600',
                                  }}
                                >
                                  {staff.employeeId}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>•</span>
                                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                                  Joined {staff.joiningDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role & Dept */}
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                            {staff.role}
                          </div>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '4px' }}>
                            <span
                              style={{
                                fontSize: '0.75rem',
                                background: 'rgba(10,37,64,0.06)',
                                color: 'var(--primary)',
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontWeight: '500',
                              }}
                            >
                              {staff.department}
                            </span>
                            <span
                              style={{
                                fontSize: '0.7rem',
                                background: '#EDE9FE',
                                color: '#6D28D9',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontWeight: '600',
                              }}
                            >
                              {staff.employmentType}
                            </span>
                          </div>
                        </td>

                        {/* Contact */}
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>✉️</span> {staff.email}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>📞</span> {staff.phone || 'N/A'}
                          </div>
                        </td>

                        {/* Status */}
                        <td style={{ padding: '16px' }}>
                          <button
                            onClick={() => handleToggleStatus(staff)}
                            title="Click to toggle status"
                            style={{
                              border: 'none',
                              cursor: 'pointer',
                              padding: '5px 12px',
                              borderRadius: '20px',
                              fontSize: '0.78rem',
                              fontWeight: '600',
                              background:
                                staff.status === 'Active'
                                  ? '#D1FAE5'
                                  : staff.status === 'On Leave'
                                  ? '#FEF3C7'
                                  : '#FEE2E2',
                              color:
                                staff.status === 'Active'
                                  ? '#065F46'
                                  : staff.status === 'On Leave'
                                  ? '#92400E'
                                  : '#991B1B',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <span
                              style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background:
                                  staff.status === 'Active'
                                    ? '#10B981'
                                    : staff.status === 'On Leave'
                                    ? '#F59E0B'
                                    : '#EF4444',
                              }}
                            />
                            {staff.status} ⟳
                          </button>
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button
                              onClick={() => openEditModal(staff)}
                              style={{
                                padding: '6px 12px',
                                background: '#F3F4F6',
                                border: '1px solid #E5E7EB',
                                borderRadius: '6px',
                                fontSize: '0.82rem',
                                color: 'var(--primary)',
                                cursor: 'pointer',
                                fontWeight: '600',
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStaff(staff.id, staff.name)}
                              style={{
                                padding: '6px 12px',
                                background: '#FEF2F2',
                                border: '1px solid #FEE2E2',
                                borderRadius: '6px',
                                fontSize: '0.82rem',
                                color: '#DC2626',
                                cursor: 'pointer',
                                fontWeight: '600',
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Staff Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '560px',
              padding: '32px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--primary)' }}>
                {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStaff}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Rajesh Sharma"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role / Designation *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Sales Manager"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Department *</label>
                  <select
                    className="form-input"
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    style={{ background: '#fff' }}
                  >
                    {DEPARTMENTS.filter((d) => d !== 'All Departments').map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="staff@hkrealty.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    placeholder="+91 98765 00000"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Employment Type</label>
                  <select
                    className="form-input"
                    value={formEmpType}
                    onChange={(e) => setFormEmpType(e.target.value as any)}
                    style={{ background: '#fff' }}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    className="form-input"
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    style={{ background: '#fff' }}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label className="form-label">Joining Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={formJoiningDate}
                    onChange={(e) => setFormJoiningDate(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline-dark"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : editingStaff ? 'Update Staff Member' : 'Add Staff Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
