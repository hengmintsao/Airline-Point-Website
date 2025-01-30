import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/authenticate";


/* =============================================================History==============================================================================
1. Date: 2025-Jan-30 Description: Update editProfile.js and CSS design. #TO-DO: Test


=====================================================================================================================================================
*/

export default function EditProfile() {
  const [formData, setFormData] = useState({
    email: "",
    nationality: "",
    mainAirport: "",
    preferenceCarrier: [],
    preferenceAlliance: [],
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();

        setFormData({
          user: data.userName || "",
          email: data.email || "",
          nationality: data.nationality || "",
          mainAirport: data.mainAirport || "",
          preferenceCarrier: data.preferenceCarrier || [],
          preferenceAlliance: data.preferenceAlliance || [],
        });
      } catch (err) {
        setError(err.message);
      }
    }

    fetchUserData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const token = getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to update profile");
      }

      const updatedUser = await response.json();
      console.log("Updated user:", updatedUser);
      router.push("/profile");
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="edit-profile-container">
      <Form onSubmit={handleSubmit} className="edit-profile-form">
        <h3 className="edit-profile-title">Edit Profile</h3>

        <div className="edit-profile-row">
          <h5>User: {formData.user} (Unable to change)</h5>
        </div>
        <div className="edit-profile-row">
          <h5>Password: </h5>
          <Button className="edit-button" href="/changePassword">
            Click
          </Button>
        </div>

       <Form.Group className="edit-profile-group">
          <Form.Label className="edit-profile-label">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            className="edit-profile-input"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="edit-profile-group">
          <Form.Label className="edit-profile-label">Nationality</Form.Label>
          <Form.Control
            type="text"
            name="nationality"
            className="edit-profile-input"
            value={formData.nationality}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="edit-profile-group">
          <Form.Label className="edit-profile-label">Main Airport</Form.Label>
          <Form.Control
            type="text"
            name="mainAirport"
            className="edit-profile-input"
            value={formData.mainAirport}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="edit-profile-group">
          <Form.Label className="edit-profile-label">Preference Carrier</Form.Label>
          <Form.Control
            type="text"
            name="preferenceCarrier"
            className="edit-profile-input"
            value={formData.preferenceCarrier.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                preferenceCarrier: e.target.value.split(",").map((s) => s.trim()),
              }))
            }
          />
        </Form.Group>

        <Form.Group className="edit-profile-group">
          <Form.Label className="edit-profile-label">Preference Alliance</Form.Label>
          <Form.Control
            type="text"
            name="preferenceAlliance"
            className="edit-profile-input"
            value={formData.preferenceAlliance.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                preferenceAlliance: e.target.value.split(",").map((s) => s.trim()),
              }))
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="edit-profile-save-btn">
          Save
        </Button>
      </Form>
    </div>
  );
}
