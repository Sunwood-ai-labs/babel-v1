import os

def create_file_structure():
    base_dir = "app"
    structure = {
        "page.tsx": "",
        "development": {
            "editor": {"page.tsx": ""},
            "systems": {"page.tsx": ""},
            "artifacts": {"page.tsx": ""},
        },
        "communication": {
            "chat": {"page.tsx": ""},
        }
    }

    def create_structure(current_path, structure):
        for key, value in structure.items():
            path = os.path.join(current_path, key)
            if isinstance(value, dict):
                os.makedirs(path, exist_ok=True)
                create_structure(path, value)
            else:
                with open(path, 'w') as f:
                    f.write(get_file_content(path))

    def get_file_content(path):
        component_name = os.path.basename(os.path.dirname(path)).capitalize()
        if component_name == "App":
            return "export default function HomePage() {\n  return <div>ホームページ</div>\n}"
        else:
            return f"""'use client'

import DynamicComponent from '@/components/DynamicComponent'

export default function {component_name}Page() {{
  return <DynamicComponent componentName="{component_name}" />
}}
"""

    create_structure(base_dir, structure)
    print("ファイル構造が作成されました。")

if __name__ == "__main__":
    create_file_structure()