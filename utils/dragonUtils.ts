export const dragonBaseUrl =
  "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/main/res/spine/character/dragon/";

export const backgroundBaseUrl =
  "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/refs/heads/main/res/spine/cavedeco/";

export const floorBaseUrl =
  "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/main/res/spine/cavedeco/";

export const auraBackBaseUrl =
  "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/main/res/spine/aura/aura_back/aura_back";

export const auraFrontBaseUrl =
  "https://raw.githubusercontent.com/vega-spica/Personality-Sneak-Peek-Expanded/main/res/spine/aura/aura_front/aura_front";

interface Asset {
  stage: "hatch" | "hatchling" | "adult";
  path: string;
  form_number: string;
  gender: "m" | "f" | "n";
  color_code: string;
}

export function getAvailableForms(forms: string[]): string[] {
  return forms.filter((form) => !form.toLowerCase().startsWith("undead"));
}

export function createFormMapping(forms: string[]): Record<string, string> {
  const formMapping: Record<string, string> = {};
  forms.forEach((form, index) => {
    const formNumber = (index + 1).toString().padStart(2, "0");
    formMapping[formNumber] = form;
  });
  return formMapping;
}

export function getSelectedFormNumber(
  formMapping: Record<string, string>,
  selectedForm: string
): string {
  return (
    Object.entries(formMapping).find(
      ([, formName]) => formName === selectedForm
    )?.[0] || ""
  );
}

export function filterAssetsByFormNumber(
  assets: Asset[],
  formNumber: string
): Asset[] {
  // console.log(assets,formNumber)
  return assets.filter((a) => a.form_number === formNumber);
}

export function groupAssetsByGender(assets: Asset[]): Record<string, Asset[]> {
  return assets.reduce((acc, asset) => {
    if (!acc[asset.gender]) {
      acc[asset.gender] = [];
    }
    acc[asset.gender].push(asset);
    return acc;
  }, {} as Record<string, Asset[]>);
}

export function getCurrentAsset(
  assets: Asset[],
  stage: string,
  gender: string
): Asset | null {
  return stage === "egg"
    ? null
    : assets.find((a) => a.stage === stage && a.gender === gender) || null;
}
