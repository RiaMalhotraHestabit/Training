import streamlit as st
import os
import sys
import json
from datetime import datetime
sys.path.append(os.path.dirname(__file__))
from main import run

st.set_page_config(page_title="NEXUS AI", layout="wide")
st.title("🧠 NEXUS AI — Multi-Agent System")

# Sidebar
st.sidebar.header("⚙️ Settings")
verbose = st.sidebar.toggle("Show Debug Trace", value=True)

# Input
query = st.text_area("Enter your task")
uploaded_file = st.file_uploader("Upload CSV/TXT", type=["csv", "txt"])

if st.button("🚀 Run"):

    if not query:
        st.warning("Please enter a query")
        st.stop()

    # Save file if uploaded
    if uploaded_file:
        file_path = os.path.join("temp", uploaded_file.name)
        os.makedirs("temp", exist_ok=True)

        with open(file_path, "wb") as f:
            f.write(uploaded_file.getbuffer())

        query += f" {file_path}"

    # Run system
    with st.spinner("Running NEXUS AI..."):
        trace = run(query, verbose=False)

    st.success("Done ✅")

    # Show pipeline
    st.subheader("🔀 Agent Pipeline")
    st.write(" → ".join(trace["agents"]))

    # Show steps
    if verbose:
        st.subheader("⚙️ Execution Trace")
        for step in trace["steps"]:
            status = "✅" if step["status"] == "success" else "❌"
            with st.expander(f"{status} Step {step['step']} — {step['agent']}"):
                st.code(step["output"])

    # Final output
    st.subheader(" Final Report")
    st.markdown(trace["final_report"])

    # Download trace
    st.download_button(
        "Download Trace",
        data=json.dumps(trace, indent=2),
        file_name=f"trace_{datetime.now().strftime('%H%M%S')}.json"
    )