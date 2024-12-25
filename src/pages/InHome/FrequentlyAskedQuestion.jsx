const FrequentlyAskedQuestion = () => {
    return (
        <div className="faq py-10 mt-4 rounded-2xl">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    <div className="bg-base-200 collapse">
                        <input type="checkbox" className="peer" />
                        <div
                            className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            How can I sign up for a marathon event?
                        </div>
                        <div
                            className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            <p>
                                You can sign up for marathon events by creating an account, browsing available events on the platform, and clicking the "Register" button on the event page. Complete the registration form to confirm your spot.
                            </p>
                        </div>
                    </div>
                    <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div
                            className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            Can I organize my own marathon event on this platform?
                        </div>
                        <div
                            className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            <p>
                                Yes! As an event organizer, you can create and manage your own marathon event by providing details such as the event title, location, dates, and registration requirements. Once published, participants can view and register for your event.
                            </p>
                        </div>
                    </div>
                    <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div
                            className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            How can I manage my registrations details?
                        </div>
                        <div
                            className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            <p>
                                After logging into your dashboard, you can view and manage all your registrations.
                            </p>
                        </div>
                    </div>
                    <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div
                            className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            Are there any fees for using the platform?
                        </div>
                        <div
                            className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            <p>
                                The platform charges no service fee for organizers to host events and participants to registration.
                            </p>
                        </div>
                    </div>
                    <div className="collapse">
                        <input type="checkbox" className="peer" />
                        <div
                            className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            Can I cancel my registration for an event?
                        </div>
                        <div
                            className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                            <p>
                                Yes, you can cancel your registration by visiting your dashboard and selecting the event.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrequentlyAskedQuestion;
