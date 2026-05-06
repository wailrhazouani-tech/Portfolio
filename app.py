from flask import Flask, render_template
import os


app = Flask(__name__)



SITE = {
    "name": "Wail Rhazouani",
    "tagline": "Data Engineering Student",
    "location": "Rabat, Morocco",
    "identity": "Data engineering student and IT specialist",
    "bio": (
        "Wail Rhazouani is a data engineer and IT student focused on building "
        "high-performance, real-time systems that turn raw data into actionable intelligence. "
        "With a minimalist, terminal-first approach, he designs lean and reliable pipelines "
        "around Apache Kafka and distributed systems, prioritizing architectural clarity over "
        "technical bloat. "
        "\n\n"
        "His disciplined mindset comes from years of martial arts training, which helps him "
        "stay calm and precise while managing mission-critical systems. After moving into native "
        "Linux environments to optimize big-data workflows, he is now focused on scaling "
        "cloud-native architectures and bringing security-first, high-efficiency engineering to "
        "Saudi Arabia's fast-growing tech sector."
    ),
    "hero_summary": (
        "Building fast, reliable data platforms with a minimalist, terminal-first workflow. "
        "Focused on Kafka, Linux, and cloud-native systems that stay lean under pressure."
    ),
    "portfolio_deck": "https://docs.google.com/presentation/d/15qpI1l8DgpzFjOaj4ubVf2BtOoXPmcxU/edit?usp=sharing&ouid=115643260947040219860&rtpof=true&sd=true",
    "portfolio_pdf": "assets/portfolio.pdf",
    "portrait_image": "assets/portrait.jpeg",
    "team_pitch_video": "https://youtu.be/1UVudFblDCU",
    "team_slides": "https://docs.google.com/presentation/d/15qpI1l8DgpzFjOaj4ubVf2BtOoXPmcxU/edit?usp=sharing&ouid=115643260947040219860&rtpof=true&sd=true",
    "linkedin": "https://www.linkedin.com/in/wail-rhazouani/",
    "github": "https://github.com/wailrhazouani-tech",
    "email": "mailto:rhazouani1999@gmail.com",
}

BIO_PARAGRAPHS = SITE["bio"].split("\n\n")


def render_page(template_name: str, page_title: str, active_page: str):
    return render_template(
        template_name,
        site=SITE,
        page_title=page_title,
        active_page=active_page,
        bio_paragraphs=BIO_PARAGRAPHS,
    )


@app.route("/")
def home():
    return render_page("index.html", f"{SITE['name']} | {SITE['tagline']}", "home")


@app.route("/bio")
def bio():
    return render_page("bio.html", f"Bio | {SITE['name']}", "bio")


@app.route("/portfolio")
def portfolio():
    return render_page("portfolio.html", f"Portfolio | {SITE['name']}", "portfolio")


@app.route("/elevator-pitch")
def elevator_pitch():
    return render_page("elevator_pitch.html", f"Elevator Pitch | {SITE['name']}", "pitch")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
