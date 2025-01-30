import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import { getToken } from "@/lib/authenticate";

/* =============================================================History==============================================================================
1. Date: 2025-Jan-30 Description: update changePassword.js and CSS design. #TO-DO: Test


=====================================================================================================================================================
*/


export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);
  

  const token = getToken();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (newPassword !== password2) {
        setError("New password and confirm password do not match.");
        return;
      }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/changePassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );



      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to update password");
      }
      alert('Password changed successfully.');
      router.push("/profile")
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="change-password-container">
      <h3>Change Password</h3>
      {error && <p className="errorMessage">Error: {error}</p>}

      <Form onSubmit={handleSubmit} className="change-password-container-form">
        <Form.Group className="change-password-container-form-group">
          <Form.Label className="change-password-container-form-label">Old Password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            value={oldPassword}
            className="change-password-container-form-control"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="change-password-container-form-group">
          <Form.Label className="change-password-container-form-label">New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={newPassword}
             className="change-password-container-form-control"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="change-password-container-form-group">
          <Form.Label className="change-password-container-form-label">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword2"
            value={password2}
             className="change-password-container-form-control"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Password
        </Button>
      </Form>
    </div>
  );
}