import { useEffect, useState } from "react";
import PageHeading from "../components/PageHeading";
import Icon from "../components/Icon";
import { learningPathways, type LearningPathway, type Lesson } from "../data/academy";
import { emptyLearningProgress, getPathwayProgress, LEARNING_PROGRESS_KEY, parseLearningProgress, recordLessonAttempt, type LearningProgress } from "../lib/learningProgress";
import "./academy.css";

export default function AcademyPage() {
  const [progress, setProgress] = useState<LearningProgress>(() => {
    try { return parseLearningProgress(window.localStorage.getItem(LEARNING_PROGRESS_KEY)); }
    catch { return emptyLearningProgress(); }
  });
  const [selectedPathwayId, setSelectedPathwayId] = useState(learningPathways[0].id);
  const [selectedLessonId, setSelectedLessonId] = useState(learningPathways[0].lessons[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try { window.localStorage.setItem(LEARNING_PROGRESS_KEY, JSON.stringify(progress)); }
    catch { /* Learning remains usable when browser storage is unavailable. */ }
  }, [progress]);

  const pathway = learningPathways.find((item) => item.id === selectedPathwayId) ?? learningPathways[0];
  const lesson = pathway.lessons.find((item) => item.id === selectedLessonId) ?? pathway.lessons[0];
  const allQuestionsAnswered = lesson.questions.every((question) => Boolean(answers[question.id]));
  const score = lesson.questions.length ? Math.round((lesson.questions.filter((question) => answers[question.id] === question.correctOptionId).length / lesson.questions.length) * 100) : 0;
  const lessonState = progress.lessons[lesson.id];

  function choosePathway(next: LearningPathway) {
    setSelectedPathwayId(next.id);
    setSelectedLessonId(next.lessons[0].id);
    setAnswers({});
    setSubmitted(false);
  }

  function chooseLesson(next: Lesson) {
    setSelectedLessonId(next.id);
    setAnswers({});
    setSubmitted(false);
  }

  function submitAssessment() {
    if (!allQuestionsAnswered) return;
    setProgress((current) => recordLessonAttempt(current, lesson.id, score));
    setSubmitted(true);
  }

  function resetProgress() {
    setProgress(emptyLearningProgress());
    setAnswers({});
    setSubmitted(false);
    try { window.localStorage.removeItem(LEARNING_PROGRESS_KEY); } catch { /* Best-effort local reset. */ }
  }

  return (
    <div className="page-stack academy-page">
      <PageHeading eyebrow="STRUCTURED EDUCATION" title="Learning Academy" description="Self-paced, source-aware learning pathways with short knowledge checks and private, browser-local progress." actions={<span className="academy-local-tag"><Icon name="lock" size={13} /> LOCAL PROGRESS</span>} />
      <section className="academy-intro">
        <div className="academy-intro-mark"><Icon name="graduation" size={27} /></div>
        <div><span className="eyebrow">FOUNDATION LEARNING RELEASE</span><h2>Learn the context. Check your understanding.</h2><p>Explore introductory material, complete a short assessment and track your own progress on this device. Passing a quiz is a learning milestone—not a professional qualification or certification.</p></div>
      </section>

      <section className="academy-pathways" aria-labelledby="pathways-heading">
        <div className="academy-section-heading"><div><span className="eyebrow">LEARNING PATHWAYS</span><h2 id="pathways-heading">Choose a pathway</h2></div><span className="academy-progress-summary">{learningPathways.reduce((sum, item) => sum + getPathwayProgress(item, progress).completed, 0)} / {learningPathways.reduce((sum, item) => sum + item.lessons.length, 0)} lessons completed</span></div>
        <div className="academy-pathway-grid">
          {learningPathways.map((item) => {
            const itemProgress = getPathwayProgress(item, progress);
            return <button type="button" key={item.id} className={`academy-pathway-card ${item.id === pathway.id ? "academy-pathway-active" : ""}`} onClick={() => choosePathway(item)} aria-pressed={item.id === pathway.id}>
              <div className="academy-pathway-top"><span className="academy-level">{item.level}</span><span className="academy-duration"><Icon name="clock" size={12} /> {item.estimatedMinutes} min</span></div>
              <h3>{item.title}</h3><p>{item.summary}</p>
              <div className="academy-progress-track" role="progressbar" aria-label={`${item.title} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={itemProgress.percent}><span style={{ width: `${itemProgress.percent}%` }} /></div>
              <div className="academy-card-footer"><span>{itemProgress.completed} of {itemProgress.total} lessons</span><span>{itemProgress.percent}%</span></div>
            </button>;
          })}
        </div>
      </section>

      <section className="academy-workspace">
        <aside className="academy-lesson-nav" aria-label="Lessons in selected pathway">
          <div className="academy-nav-heading"><span className="eyebrow">COURSE CONTENT</span><h2>{pathway.title}</h2></div>
          {pathway.lessons.map((item, index) => {
            const itemProgress = progress.lessons[item.id];
            return <button type="button" key={item.id} className={`academy-lesson-link ${item.id === lesson.id ? "academy-lesson-active" : ""}`} onClick={() => chooseLesson(item)}>
              <span className="academy-lesson-number">{itemProgress?.completed ? <Icon name="check" size={15} /> : String(index + 1).padStart(2, "0")}</span>
              <span><strong>{item.title}</strong><small>{item.durationMinutes} min · {itemProgress?.completed ? "Completed" : "Not completed"}</small></span>
            </button>;
          })}
          <div className="academy-outcomes"><strong>Learning outcomes</strong>{pathway.outcomes.map((outcome) => <span key={outcome}><Icon name="check" size={13} />{outcome}</span>)}</div>
        </aside>

        <article className="academy-lesson">
          <div className="academy-lesson-header"><div><span className="eyebrow">LESSON · {lesson.durationMinutes} MINUTES</span><h2>{lesson.title}</h2></div>{lessonState?.completed && <span className="academy-complete-pill"><Icon name="check" size={13} /> Completed</span>}</div>
          <div className="academy-objectives"><strong>By the end of this lesson, you should be able to:</strong><ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>
          <div className="academy-reading">{lesson.sections.map((section, index) => <section key={section.heading}><span className="academy-reading-index">0{index + 1}</span><div><h3>{section.heading}</h3><p>{section.body}</p></div></section>)}</div>

          <div className="academy-assessment" aria-labelledby="assessment-heading">
            <div className="academy-assessment-heading"><div><span className="eyebrow">KNOWLEDGE CHECK</span><h3 id="assessment-heading">Test your understanding</h3></div><span>{lesson.questions.length} questions</span></div>
            {lesson.questions.map((question, index) => <fieldset className="academy-question" key={question.id} disabled={submitted}>
              <legend><span>{String(index + 1).padStart(2, "0")}</span>{question.prompt}</legend>
              <div className="academy-options">{question.options.map((option) => <label key={option.id} className={`academy-option ${submitted && option.id === question.correctOptionId ? "academy-option-correct" : ""} ${submitted && answers[question.id] === option.id && option.id !== question.correctOptionId ? "academy-option-incorrect" : ""}`}>
                <input type="radio" name={question.id} value={option.id} checked={answers[question.id] === option.id} onChange={() => setAnswers((current) => ({ ...current, [question.id]: option.id }))} />
                <span>{option.text}</span>{submitted && option.id === question.correctOptionId && <Icon name="check" size={15} />}
              </label>)}</div>
              {submitted && <p className="academy-explanation">{question.explanation}</p>}
            </fieldset>)}
            {!submitted ? <button type="button" className="button button-primary academy-submit" disabled={!allQuestionsAnswered} onClick={submitAssessment}>Submit answers <Icon name="arrow" size={15} /></button> :
              <div className="academy-result" role="status"><div><span className="eyebrow">ASSESSMENT RESULT</span><strong>{score}%</strong><p>{score >= 70 ? "Lesson completed. Well done." : "Not quite there yet. Review the explanations and try again."} A score of 70% is needed to mark this lesson complete.</p>{lessonState && <small>Best score: {lessonState.bestScore}% · Attempts: {lessonState.attempts}</small>}</div><button type="button" className="button button-secondary" onClick={() => { setAnswers({}); setSubmitted(false); }}>Try again</button></div>}
          </div>
        </article>
      </section>

      <section className="academy-governance"><Icon name="shield" size={19} /><div><strong>Educational scope and privacy</strong><p>Content is introductory and non-operational. Progress is stored only in this browser's local storage; it is not sent to a SPECTRA server. Clearing browser data or using another device may remove or reset progress. Do not use this module as a substitute for official UN, national or employer-authorised training.</p></div><button type="button" className="text-button" onClick={resetProgress}>Reset local progress</button></section>
    </div>
  );
}
