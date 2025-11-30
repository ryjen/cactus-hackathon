/**
 * TODO: parsing the output of the AI
 */


export const END_TOKEN = '<|im_end|>';

export const massageResponse = (response?: string | null): string | null => {
    if (!response) return null;
    const end = response.lastIndexOf(END_TOKEN)
    const description = response.substring(0, end)
    return description
}

