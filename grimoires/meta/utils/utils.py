import os
import anthropic


def generate_response(model, prompt, max_tokens, temperature):
    """
    Anthropic APIを使用してプロンプトに対する応答を生成する関数。

    引数:
        model (str): 使用するモデル名
        prompt (str): 応答を生成するためのプロンプト
        max_tokens (int): 生成する最大トークン数
        temperature (float): 生成の温度パラメータ

    戻り値:
        str: 生成された応答テキスト
    """
    client = anthropic.Anthropic(
        api_key=os.environ.get("ANTHROPIC_API_KEY")  # 環境変数からAPI keyを取得
    )
    # print(prompt)

    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        temperature=temperature,
        extra_headers={"anthropic-beta": 
            "max-tokens-3-5-sonnet-2024-07-15"
        },
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }
        ]
    )

    # print(response)
    
    return response.content[0].text.strip()


import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')

def normal(text: str) -> str:
    """
    テキスト内のコードブロックを抽出する関数。

    引数:
        text (str): 処理対象のテキスト

    戻り値:
        str: 抽出されたコードブロックのみを含むテキスト
    """
    logger.info("normal関数が呼び出されました")
    logger.info("テキスト処理を開始します")
    lines = text.split('\n')
    logger.info(f"テキストを{len(lines)}行に分割しました")
    result = []
    code_block = []
    inside_code_block = False
    current_language = None

    for line in lines:
        logger.debug(f"処理中の行: {line}")
        if line.strip().startswith('```'):
            if not inside_code_block:
                inside_code_block = True
                current_language = line.strip('`').lower()
                logger.debug(f"コードブロック開始: 言語 = {current_language}")
            else:
                inside_code_block = False
                logger.debug("コードブロック終了")
                result.extend(code_block)
                code_block = []
                current_language = None
        elif inside_code_block:
            logger.debug(f"コードブロック内の行を追加: {line}")
            code_block.append(line)
        else:
            logger.debug(f"通常のテキスト行をスキップ: {line}")

    # コードブロックが閉じられていない場合の処理を追加
    if inside_code_block:
        logger.warning("コードブロックが閉じられていません。残りのコードを結果に追加します。")
        result.extend(code_block)

    logger.info("テキスト処理が完了しました")
    return '\n'.join(result)
