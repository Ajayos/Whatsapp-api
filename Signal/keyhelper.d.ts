export function generateSenderKey(): Buffer;
export function generateSenderKeyId(): number;
export function generateSenderSigningKey(key: any): {
    public: any;
    private: any;
};
