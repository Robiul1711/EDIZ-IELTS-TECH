import PTEExamLayout from "@/layout/PTE/PTEExamLayout";
import SpeakingWritingPTELayout from "@/layout/PTE/SpeakingWritingPTELayout";
import PTEHeadSetCheck from "@/pages/ptePage/PTEHeadSetCheck";
import PTEKeyboardCheck from "@/pages/ptePage/PTEKeyboardCheck";
import PTEMicrophoneCheck from "@/pages/ptePage/PTEMicrophoneCheck";
import PTEDescribeImage from "@/pages/ptePage/speakingWritting/PTEDescribeImage";
import PTEGroupDiscussion from "@/pages/ptePage/speakingWritting/PTEGroupDiscussion";
import PTEPersonalInterdiction from "@/pages/ptePage/speakingWritting/PTEPersonalInterdiction";
import PTEReadAloud from "@/pages/ptePage/speakingWritting/PTEReadAloud";
import PTERepeatSentence from "@/pages/ptePage/speakingWritting/PTERepeatSentence";
import PTERespondSituation from "@/pages/ptePage/speakingWritting/PTERespondSituation";
import PTERetellLecture from "@/pages/ptePage/speakingWritting/PTERetellLecture";
import PTEShortQuestion from "@/pages/ptePage/speakingWritting/PTEShortQuestion";
import PTESummarize from "@/pages/ptePage/speakingWritting/PTESummarize";
import PTEStartTest from "@/pages/ptePage/speakingWritting/PTEStartTest";
import PTESylluabusSW from "@/pages/ptePage/speakingWritting/PTESylluabusSW";
import PTEResult from "@/pages/ptePage/speakingWritting/PTEResult";
import ReadingSyllubus from "@/pages/ptePage/reading/ReadingSyllubus";
import FillinBlank from "@/pages/ptePage/reading/FillinBlank";
import MCQquestion from "@/pages/ptePage/reading/MCQquestion";
import MCQSingleQuestion from "@/pages/ptePage/reading/MCQSingleQuestion";
import FillinBlank2 from "@/pages/ptePage/reading/FillinBlank2";
import ReOrder from "@/pages/ptePage/reading/ReOrder";
import ListeningHeadSetCheck from "@/pages/ptePage/listeningTest/ListeningHeadSetCheck";
import ListeningMicrophoneCheck from "@/pages/ptePage/listeningTest/ListeningMicrophoneCheck";
import ListeningKeyboardCheck from "@/pages/ptePage/listeningTest/ListeningKeyboardCheck";
import ListeningSyllubus from "@/pages/ptePage/listeningTest/ListeningSyllubus";
import SummarizeSpoken from "@/pages/ptePage/listeningTest/SummarizeSpoken";
import ListeningMCQMultiple from "@/pages/ptePage/listeningTest/ListeningMCQMultiple";
import ListeningBlank from "@/pages/ptePage/listeningTest/ListeningBlank";
import ListeningMCQSingle from "@/pages/ptePage/listeningTest/ListeningMCQSingle";
import ListeningHighlightSummary from "@/pages/ptePage/listeningTest/ListeningHighlightSummary";
import ListeningMissingWord from "@/pages/ptePage/listeningTest/ListeningMissingWord";
import ListeningHighlightIncorrectWord from "@/pages/ptePage/listeningTest/ListeningHighlightIncorrectWord";
import ListeningDictation from "@/pages/ptePage/listeningTest/ListeningDictation";
 

export const pteRoutes = {
    path: "/pte",
    element: <SpeakingWritingPTELayout />,
    children: [
        // for speaking and writing module
        {
            path: "headset-check",
            element: <PTEHeadSetCheck />,
        },
        {
            path: "microphone-check",
            element: <PTEMicrophoneCheck />
        },
        {
            path: "keyboard-check",
            element: <PTEKeyboardCheck />
        },
        {
            path: "syllubus",
            element: <PTESylluabusSW />
        },
        {
            path: "test-start",
            element: <PTEStartTest />
        },
        {
            path: "result",
            element: <PTEResult />
        },
        // for listening module 
        {
            path: "listening/headset-check",
            element: <ListeningHeadSetCheck />
        },
        {
            path: "listening/microphone-check",
            element: <ListeningMicrophoneCheck />
        },
        {
            path: "listening/keyboard-check",
            element: <ListeningKeyboardCheck />
        },
        {
            path: "listening/syllubus",
            element: <ListeningSyllubus />
        }
    ]
}

export const pteExaminationSpeakingWrittingRoutes = {
    path: "pte-examination",
    element: <PTEExamLayout />,
    children: [
        {
            index: true,
            element: <PTEPersonalInterdiction />
        },
        {
            path: "read-aloud",
            element: <PTEReadAloud />
        },
        {
            path: "repeat-sentence",
            element: <PTERepeatSentence />
        },
        {
            path: "describe-image",
            element: <PTEDescribeImage />
        },
        {
            path: "retell-lecture",
            element: <PTERetellLecture />
        },
        {
            path: "short-question",
            element: <PTEShortQuestion />
        },
        {
            path: "group-discussion",
            element: <PTEGroupDiscussion />
        },
        {
            path: "respond-situation",
            element: <PTERespondSituation />
        },
        {
            path: "summarize-written-text",
            element: <PTESummarize />
        },

    ]
}

export const pteExaminationReadingRoutes = {
    path: "pte-examination-reading",
    element: <PTEExamLayout />,
    children: [
        {
            index: true,
            element: <ReadingSyllubus />
        },
        {
            path: "fill-in-blanks",
            element: <FillinBlank />
        },
        {
            path: "mcq-question",
            element: <MCQquestion />
        },
        {
            path: "mcq-single-answer",
            element: <MCQSingleQuestion />
        },
        {
            path: "fill-in-blanks-2",
            element: <FillinBlank2 />
        },
        {
            path: "reorder-paragraphs",
            element: <ReOrder />
        }
    ]
}

export const pteExaminationListeningRoutes = {
    path: "pte-examination-listening",
    element: <PTEExamLayout />,
    children: [
        {
            index: true,
            element: <SummarizeSpoken />
        },
        {
            path: "multiple-choice-multiple-answers",
            element: <ListeningMCQMultiple />
        },
        {
            path: "fill-in-blanks",
            element: <ListeningBlank />
        },
        {
            path: "multiple-choice-single-answer",
            element: <ListeningMCQSingle />
        },
        {
            path: "highlight-correct-summary",
            element: <ListeningHighlightSummary />
        },
        {
            path: "select-missing-word",
            element: <ListeningMissingWord />
        },
        {
            path: "highlight-incorrect-words",
            element: <ListeningHighlightIncorrectWord />
        },
        {
            path: "write-from-dictation",
            element: <ListeningDictation />
        }
    ]
}