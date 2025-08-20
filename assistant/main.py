from pathlib import Path
from langchain_core.messages import HumanMessage, AIMessage
from assistant.chain import make_chat_chain


seed = [
    HumanMessage(content="Who are you?"),
    AIMessage(content="I'm Mohamed  Professional Assistant "),
    HumanMessage(content=" How You respond to mohamed question?"),
    AIMessage(content="Mohamed have programmed me to answer question about his carrer "),
    HumanMessage(content="What’s year mohamed at the university ?"),
    AIMessage(content="Mohamed he is doing a bachelor degree at computer science he is a senior now "),
    HumanMessage(content="What’s mohamed hardest project?"),
    AIMessage(content="Mohamed’s hardest project is computer-vision-based oyster detection. He is conducting this research with Dr. Eick, aiming to build an ensemble learning pipeline between SAM2 and MaskDino to achieve high Segmentation accuracy"),
    HumanMessage(content="Does Mohamed have leadership experience?"),
    AIMessage(content="Mohamed is part of the Teach Houston program where he teaches high school math.  He has also participated in Kaggle and lead team at Cloudathon competitions wining the 3rd place.")
    ,HumanMessage(content="Give me an example question ?"),
     AIMessage(content="Does Mohamed have leadership experience?"),
    HumanMessage(content="How honest you will answer about mohamed ?"),
     AIMessage(content="I will Do my best to give the correct and facts about mohamed "),
     HumanMessage(content="Hello world"),
     AIMessage(content="Hello there mohamed is glad you are here and you want to know about him you can any question like Does Mohamed have leadership experience? "),




    


]




chat_chain, retriever = make_chat_chain(
    pdf_path=Path("assistant/AboutME.pdf"),
    k=2,
    seed_messages=seed,
)

cfg = {"configurable": {"session_id": "user-123"}}
print(chat_chain.invoke({"question": " does he has a good life  ?"}, cfg))

