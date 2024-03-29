from fastapi import HTTPException
from tempfile import NamedTemporaryFile
import os
import whisper
import torch

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
model = whisper.load_model("large", device=DEVICE)

async def stt(file):
    if not file:
        raise HTTPException(status_code=400, detail="파일이 없습니다.")
    try:
        with NamedTemporaryFile(delete=False) as temp:
            temp.write(await file.read())
            temp.flush()
            result = model.transcribe(temp.name, language="korean")
            transcript = result['text']
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"처리 실패 : {e}")
    finally:
        os.remove(temp.name)

    return transcript