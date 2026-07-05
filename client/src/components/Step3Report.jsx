import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-lg">Loading Report...</p>
      </div>
    );
  }
  const navigate = useNavigate()
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;


  const downloadPDF = () => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  let currentY = 25;

  // ================= TITLE =================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(34, 197, 94);
  doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
    align: "center",
  });

  currentY += 5;

  // underline
  doc.setDrawColor(34, 197, 94);
  doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

  currentY += 15;

  // ================= FINAL SCORE BOX =================
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(
    `Final Score: ${finalScore}/10`,
    pageWidth / 2,
    currentY + 12,
    { align: "center" }
  );

  currentY += 30;

  // ================= SKILLS BOX =================
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

  doc.setFontSize(12);

  doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
  doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
  doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

  currentY += 45;

  // ================= ADVICE =================
  let advice = "";

  if (finalScore >= 8) {
    advice =
      "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
  } else if (finalScore >= 5) {
    advice =
      "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
  } else {
    advice =
      "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
  }

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(220);
  doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

  doc.setFont("helvetica", "bold");
  doc.text("Professional Advice", margin + 10, currentY + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
  doc.text(splitAdvice, margin + 10, currentY + 20);

  currentY += 50;

  // ================= QUESTION TABLE =================
  autoTable(doc, {
  startY: currentY,
  margin: { left: margin, right: margin },
  head: [["#", "Question", "Score", "Feedback"]],
  body: questionWiseScore.map((q, i) => [
    `${i + 1}`,
    q.question,
    `${q.score}/10`,
    q.feedback,
  ]),
  styles: {
    fontSize: 9,
    cellPadding: 5,
    valign: "top",
  },
  headStyles: {
    fillColor: [34, 197, 94],
    textColor: 255,
    halign: "center",
  },
  columnStyles: {
    0: { cellWidth: 10, halign: "center" }, // index
    1: { cellWidth: 55 }, // question
    2: { cellWidth: 20, halign: "center" }, // score
    3: { cellWidth: "auto" }, // feedback
  },
  alternateRowStyles: {
    fillColor: [249, 250, 251],
  },
});


  doc.save("AI_Interview_Report.pdf");
};

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-10 py-8'>
      <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center'>
          <button
            onClick={() => navigate("/history")}
            className='inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-100 transition hover:border-emerald-400'>
            <FaArrowLeft className='text-slate-100' />
          </button>
          <div>
            <h1 className='text-3xl font-bold text-slate-100'>Interview Analytics Dashboard</h1>
            <p className='text-slate-400 mt-2'>AI-powered performance insights</p>
          </div>
        </div>

        <button onClick={downloadPDF} className='rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400'>Download PDF</button>
      </div>

      <div className='grid gap-6 lg:grid-cols-3 lg:gap-8'>
        <div className='space-y-6'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='rounded-[32px] border border-slate-800 bg-slate-900/95 p-8 text-center shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)]'>
            <h3 className='text-slate-400 mb-4 text-sm sm:text-base'>Overall Performance</h3>
            <div className='relative mx-auto w-24 h-24 sm:w-28 sm:h-28'>
              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#22c55e",
                  textColor: "#a7f3d0",
                  trailColor: "#334155",
                })}
              />
            </div>
            <p className='text-slate-500 mt-3 text-xs sm:text-sm'>Out of 10</p>
            <div className='mt-4'>
              <p className='font-semibold text-slate-100 text-sm sm:text-base'>{performanceText}</p>
              <p className='text-slate-400 text-xs sm:text-sm mt-1'>{shortTagline}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='rounded-[32px] border border-slate-800 bg-slate-900/95 p-8 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)]'>
            <h3 className='text-base sm:text-lg font-semibold text-slate-100 mb-6'>Skill Evaluation</h3>
            <div className='space-y-5'>
              {skills.map((s, i) => (
                <div key={i}>
                  <div className='flex justify-between mb-2 text-sm sm:text-base text-slate-100'>
                    <span>{s.label}</span>
                    <span className='font-semibold text-emerald-400'>{s.value}</span>
                  </div>
                  <div className='h-2 sm:h-3 rounded-full bg-slate-800'>
                    <div className='h-full rounded-full bg-emerald-400' style={{ width: `${s.value * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className='lg:col-span-2 space-y-6'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='rounded-[32px] border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)]'>
            <h3 className='text-base sm:text-lg font-semibold text-slate-100 mb-4 sm:mb-6'>Performance Trend</h3>
            <div className='h-64 sm:h-72'>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 10]} tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', color: '#e2e8f0' }} />
                  <Area type="monotone" dataKey="score" stroke="#22c55e" fill="#0f766e" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='rounded-[32px] border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.9)]'>
            <h3 className='text-base sm:text-lg font-semibold text-slate-100 mb-6'>Question Breakdown</h3>
            <div className='space-y-6'>
              {questionWiseScore.map((q, i) => (
                <div key={i} className='rounded-[28px] border border-slate-800 bg-slate-950/90 p-6'>
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>
                    <div>
                      <p className='text-xs text-slate-500'>Question {i + 1}</p>
                      <p className='font-semibold text-slate-100 text-sm sm:text-base leading-relaxed'>{q.question || "Question not available"}</p>
                    </div>
                    <div className='rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300'>
                      {q.score ?? 0}/10
                    </div>
                  </div>
                  <div className='rounded-3xl border border-emerald-400/10 bg-emerald-500/10 p-4'>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 mb-2'>AI Feedback</p>
                    <p className='text-sm leading-relaxed text-slate-300'>
                      {q.feedback && q.feedback.trim() !== "" ? q.feedback : "No feedback available for this question."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Step3Report
