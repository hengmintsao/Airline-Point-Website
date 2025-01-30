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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = getToken();
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

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

      const msgData = await res.json();
      setSuccess(msgData.message);
      router.push("/profile.js")
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="changePasswordContainer">
      <h3>Change Password</h3>
      {error && <p className={styles.errorMessage}>Error: {error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}

      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group className="mb-3" controlId="formOldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Password
        </Button>
      </Form>
    </div>
  );
}