import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Camera, Lock, Upload } from "lucide-react";

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-charcoal">Profile</h1>
          <p className="text-sm text-brand-charcoal/60">Manage your personal information and account settings.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
          <Button onClick={handleSave}>
            <User className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Avatar Upload Card */}
        <Card className="rounded-2xl border border-border/60 bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-brand-charcoal">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-brand-yellow text-3xl font-bold text-brand-charcoal flex items-center justify-center ring-2 ring-white">
                    {profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                )}
                <label className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-brand-charcoal text-white flex items-center justify-center cursor-pointer hover:bg-brand-charcoal/90 transition">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-brand-charcoal">Upload Photo</p>
                <p className="text-xs text-brand-charcoal/60">JPG, PNG or GIF (Max 5MB)</p>
              </div>
              <Button variant="outline" className="w-full" asChild>
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
        <Card className="rounded-2xl border border-border/60 bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)]">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-brand-charcoal">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Password Change Dialog */}
      {showPasswordDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md mx-4 rounded-2xl border border-border/60 bg-card shadow-[0_10px_40px_-20px_rgba(0,0,0,0.1)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-brand-charcoal">Change Password</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPasswordDialog(false)}
                className="h-8 w-8 p-0"
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
