import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Camera, Lock, Upload, Shield, Award, Zap, TrendingUp } from "lucide-react";

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: null as string | null,
  });

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save profile logic here
    console.log("Profile saved:", profileData);
  };

  const stats = [
    { label: "Account Status", value: "Active", icon: Shield, color: "emerald" },
    { label: "Member Since", value: "Jan 2024", icon: Award, color: "blue" },
    { label: "Total Savings", value: "₹10,45,000", icon: TrendingUp, color: "yellow" },
    { label: "Quick Actions", value: "3", icon: Zap, color: "purple" },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-yellow/20 via-brand-yellow/10 to-brand-yellow/5 border border-brand-yellow/30 p-4 sm:p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-brand-yellow/10 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-brand-yellow/10 rounded-full blur-xl sm:blur-2xl" />
        <div className="relative z-10 flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-charcoal mb-2">My Profile</h1>
            <p className="text-base sm:text-lg text-brand-charcoal/70">Manage your account and personalize your experience</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={() => setShowPasswordDialog(true)} className="bg-white/80 backdrop-blur-sm border-brand-yellow/30 hover:bg-white w-full sm:w-auto">
              <Lock className="h-4 w-4 mr-2" />
              Change Password
            </Button>
            <Button onClick={handleSave} className="bg-brand-charcoal text-white hover:bg-brand-charcoal/90 shadow-lg w-full sm:w-auto">
              <User className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="group relative overflow-hidden rounded-xl sm:rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-brand-charcoal/60 mb-1">{stat.label}</p>
                    <p className={`text-lg sm:text-xl font-bold ${
                      stat.color === 'emerald' ? 'text-emerald-600' :
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'yellow' ? 'text-amber-600' :
                      'text-purple-600'
                    }`}>{stat.value}</p>
                  </div>
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center ${
                    stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                    stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    stat.color === 'yellow' ? 'bg-amber-100 text-amber-600' :
                    'bg-purple-100 text-purple-600'
                  } transition-all group-hover:scale-110`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar Upload Card */}
        <Card className="lg:col-span-1 relative overflow-hidden rounded-xl sm:rounded-2xl border-0 bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5 shadow-xl">
          <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-brand-yellow/10 rounded-full blur-xl sm:blur-2xl" />
          <CardHeader className="relative z-10 pb-4">
            <CardTitle className="text-base sm:text-lg font-bold text-brand-charcoal flex items-center gap-2">
              <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4 sm:space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover ring-4 ring-white shadow-xl transition-all group-hover:scale-105"
                  />
                ) : (
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-brand-yellow to-brand-yellow/80 text-3xl sm:text-4xl font-bold text-brand-charcoal flex items-center justify-center ring-4 ring-white shadow-xl transition-all group-hover:scale-105">
                    {profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                )}
                <label className="absolute bottom-2 right-2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-brand-charcoal text-white flex items-center justify-center cursor-pointer hover:bg-brand-charcoal/90 transition-all hover:scale-110 shadow-lg">
                  <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-brand-charcoal mb-1">Upload Photo</p>
                <p className="text-xs text-brand-charcoal/60">JPG, PNG or GIF (Max 5MB)</p>
              </div>
              <Button variant="outline" className="w-full bg-white/80 backdrop-blur-sm border-brand-yellow/30 hover:bg-white" asChild>
                <label className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card className="lg:col-span-2 relative overflow-hidden rounded-xl sm:rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-brand-yellow/10 to-transparent rounded-full blur-2xl sm:blur-3xl" />
          <CardHeader className="relative z-10 pb-4">
            <CardTitle className="text-base sm:text-lg font-bold text-brand-charcoal flex items-center gap-2">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4 sm:space-y-6">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-brand-charcoal">Full Name</Label>
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="h-10 sm:h-11 rounded-xl border-brand-yellow/20 focus:border-brand-yellow focus:ring-brand-yellow/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-brand-charcoal flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-10 sm:h-11 rounded-xl border-brand-yellow/20 focus:border-brand-yellow focus:ring-brand-yellow/20"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-brand-charcoal flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="h-10 sm:h-11 rounded-xl border-brand-yellow/20 focus:border-brand-yellow focus:ring-brand-yellow/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Password Change Dialog */}
      {showPasswordDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md mx-4 rounded-2xl sm:rounded-3xl border-0 bg-gradient-to-br from-white to-gray-50 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-brand-charcoal flex items-center gap-2">
                <Lock className="h-5 w-5 sm:h-6 sm:w-6" />
                Change Password
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPasswordDialog(false)}
                className="h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full hover:bg-brand-yellow/10"
              >
                ×
              </Button>
            </div>

            <PasswordChangeForm onClose={() => setShowPasswordDialog(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

// Password Change Form Component
function PasswordChangeForm({ onClose }: { onClose: () => void }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    // Password change logic here
    console.log("Password changed successfully");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="currentPassword" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Current Password
        </Label>
        <div className="relative">
          <Input
            id="currentPassword"
            type={showPasswords.current ? "text" : "password"}
            value={passwordData.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
            className="mt-1 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('current')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/60 hover:text-brand-charcoal"
          >
            {showPasswords.current ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="newPassword" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          New Password
        </Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showPasswords.new ? "text" : "password"}
            value={passwordData.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
            className="mt-1 pr-10"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('new')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/60 hover:text-brand-charcoal"
          >
            {showPasswords.new ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Confirm New Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPasswords.confirm ? "text" : "password"}
            value={passwordData.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
            className="mt-1 pr-10"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility('confirm')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/60 hover:text-brand-charcoal"
          >
            {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
          </button>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Update Password
        </Button>
      </div>
    </form>
  );
}

export default ProfilePage;
