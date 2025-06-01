import Container from "./Container";
import Alert from "./Alert";
import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    "entry.1835579550": "",
    "entry.605824708": "",
    "entry.412088699": "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const alertTimerRef = useRef(null);

  const actionURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeSokqRoSC_3ohmiSDAoJR60k6gHRli2WwI9EHfF3gyAJ_51A/formResponse";

  useEffect(() => {
    if (submissionStatus) {
      if (alertTimerRef.current) {
        clearTimeout(alertTimerRef.current);
      }
      alertTimerRef.current = setTimeout(() => {
        setSubmissionStatus(null);
        setSubmissionMessage("");
      }, 4000 + 300);
    }
  }, [submissionStatus]);

  useEffect(() => {
    return () => {
      if (alertTimerRef.current) {
        clearTimeout(alertTimerRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmissionStatus(null);
    setSubmissionMessage("");

    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }

    try {
      await fetch(actionURL, {
        method: "POST",
        body: dataToSend,
        mode: "no-cors",
      });

      setFormData({
        "entry.1835579550": "",
        "entry.605824708": "",
        "entry.412088699": "",
      });
      setSubmissionStatus("success");
      setSubmissionMessage(
        "Message sent successfully! Please check your email (including spamm folder) for more further information. Thank you for connecting!😊",
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
      setSubmissionMessage(
        `Failed to send message. Please try again. Error: ${error.message || error.toString()}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-18">
      <Container className="grid max-w-[min(95%,850px)] grid-cols-1 gap-4">
        <div className="section-heading popup">
          <h2 className="popup-up">Let's Connect</h2>
          <p className="popup-up">
            Your inquiries and feedback are important to me. For any questions
            about me, potential partnerships, or general information, please use
            the form or contact me directly. I look forward to connecting with
            you!
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <fieldset className="fieldset popup-up">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              className="input validator w-full"
              required
              minLength="1"
              title="Required"
              placeholder="Your Name"
              name="entry.1835579550"
              value={formData["entry.1835579550"]}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <small className="validator-hint my-0">Required</small>
          </fieldset>
          <fieldset className="fieldset popup-up">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input validator w-full"
              required
              placeholder="your@mail.com"
              name="entry.605824708"
              value={formData["entry.605824708"]}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <small className="validator-hint my-0">
              Enter valid email address.
            </small>
          </fieldset>
          <fieldset className="fieldset popup-up">
            <legend className="fieldset-legend">Message</legend>
            <textarea
              className="textarea input validator w-full resize-none"
              minLength="20"
              rows="3"
              placeholder="Message"
              required
              name="entry.412088699"
              value={formData["entry.412088699"]}
              onChange={handleChange}
              disabled={isSubmitting}
            ></textarea>
            <small className="validator-hint my-0">
              Atleast 20 characters.
            </small>
          </fieldset>
          <button
            className="btn btn-primary btn-outline popup-up my-3 w-full"
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            <IoSend className="icon" />
          </button>
        </form>
      </Container>
      <Alert status={submissionStatus} duration={4000}>
        {submissionMessage}
      </Alert>
    </section>
  );
}
